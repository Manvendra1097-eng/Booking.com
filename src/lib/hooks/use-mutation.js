import React from 'react';
import axiosInstance from '../axios-instance';

const useMutation = (url, method) => {
  const [mutateState, setMutateState] = React.useState({
    data: null,
    pending: false,
    error: null,
  });

  const mutate = React.useCallback(
    async (data, options = {}) => {
      try {
        setMutateState((prev) => ({ ...prev, pending: true, error: null }));

        const response = await axiosInstance({
          method,
          url,
          data,
          ...options.axiosConfig, // Allow custom axios config
        });

        const result = response.data;

        setMutateState({
          data: result,
          pending: false,
          error: null,
        });

        options.onSuccess?.(result, response);
        return result;
      } catch (err) {
        const error = err.response?.data?.message || err.message;

        setMutateState((prev) => ({
          ...prev,
          error,
          pending: false,
        }));

        // If onError provided, don't throw (callback handles it)
        if (options.onError) {
          options.onError(err);
          return null;
        } else {
          // If no onError, throw for try/catch
          throw err;
        }
      }
    },
    [url, method]
  );
  return {
    ...mutateState,
    mutate,
  };
};

export default useMutation;
