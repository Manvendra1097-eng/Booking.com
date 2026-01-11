import ErrorUi from '../ErrorUi';

const RenderUI = ({ children, isLoading, error, loadingComp: LoadingComp }) => {
  if (isLoading) {
    return <LoadingComp />;
  }

  if (error) {
    return <ErrorUi />;
  }

  return <>{children}</>;
};

export default RenderUI;
