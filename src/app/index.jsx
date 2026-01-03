import { Toaster } from 'sonner';
import Router from './router';

function App() {
  return (
    <>
      <Router />
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
