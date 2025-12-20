import Header from '@/components/layouts/header';
import React from 'react';
import Home from './home';
import Footer from '@/components/layouts/footer';
import HotelDetails from './hotel-details';
import Signin from './auth/sign-in';
import Signup from './auth/sign-up';

function App() {
  return (
    <div>
      <Header />
      <Home />
      {/* <HotelDetails /> */}
      {/* <Signin /> */}
      {/* <Signup /> */}
      <Footer />
    </div>
  );
}

export default App;
