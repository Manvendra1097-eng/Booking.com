import { Toaster } from '@/components/ui/sonner';
import { AuthContextProvider } from '@/context_provider/auth-context-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <Router />
        <Toaster richColors position="top-center" />
      </AuthContextProvider>
       <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
