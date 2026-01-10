import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './app';
import Home from './app/home';
import SearchPage from './app/search';
import Signin from './app/auth/sign-in';
import Signup from './app/auth/sign-up';

const route = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'signin',
        element: <Signin />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
];

const router = createBrowserRouter(route);

const Router = ({ children }) => {
  return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default Router;
