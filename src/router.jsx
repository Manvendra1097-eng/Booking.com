import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './app';
import Home from './app/home';
import SearchPage from './app/search';
import Signin from './app/auth/sign-in';
import Signup from './app/auth/sign-up';
import HotelDetails from './app/hotel-details';
import ErrorUi from './components/ErrorUi';
import ErrorBoundry from './components/ErrorBoundry';
import WithSearchLayout from './components/layouts/WithSearchLayout';

const route = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorUi />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'search',
        element: (
          <WithSearchLayout>
            <SearchPage />
          </WithSearchLayout>
        ),
      },
      {
        path: 'signin',
        element: <Signin />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'hotels/:hotelId',
        element: (
          <ErrorBoundry>
            <HotelDetails />
          </ErrorBoundry>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(route);

const Router = ({ children }) => {
  return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default Router;
