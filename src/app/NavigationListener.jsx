import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { authEmitter } from '@/lib/axios-instance';
import { devLog } from '@/lib/utils';

/**
 * NavigationListener Component
 *
 * Listens for navigation events emitted by the axios interceptor
 * when authentication fails or token refresh is needed.
 *
 * This component doesn't render anything - it's just for side effects.
 */
function NavigationListener() {
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for navigation events from axios interceptor
    const unsubscribe = authEmitter.on('navigationNeeded', (path) => {
      devLog('log', '🔀 Navigation needed:', path);
      navigate(path, { replace: true });
    });

    return unsubscribe;
  }, [navigate]);

  return null; // This component doesn't render anything
}

export default NavigationListener;
