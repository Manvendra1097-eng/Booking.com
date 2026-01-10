import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import { Outlet } from 'react-router';

function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
