import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { authEmitter } from '@/lib/axios-instance';
import { devLog } from '@/lib/utils';
import { useAuth } from '@/context_provider/auth-context-provider';
import { useQueryClient } from '@tanstack/react-query';

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
  const { login, logout } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Listen for navigation events from axios interceptor
    const unsubscribeNavigation = authEmitter.on('navigationNeeded', (path) => {
      devLog('log', '🔀 Navigation needed:', path);
      navigate(path, { replace: true });
    });
    const unsubscribeRefresh = authEmitter.on('tokenRefreshed', (newToken) => {
      console.log('🔄 Token refreshed event received in NavigationListener');
      login(newToken);
      // Invalidate user profile to refetch with new token
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    });

    const unsubscribeLogout = authEmitter.on('logout', () => {
      console.log('🚪 Logout event received from interceptor');
      logout();
    });

    return () => {
      console.log('🧹 Cleaning up auth event listeners');
      unsubscribeNavigation();
      unsubscribeRefresh();
      unsubscribeLogout();
    };
  }, [navigate, login, logout, queryClient]);

  return null; // This component doesn't render anything
}

export default NavigationListener;
