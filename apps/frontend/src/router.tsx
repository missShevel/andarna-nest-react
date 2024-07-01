import { createBrowserRouter } from 'react-router-dom';
import App from './app/app';
import { SignUpPage } from './pages';
import SignInPage from './pages/sign-in';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
]);
