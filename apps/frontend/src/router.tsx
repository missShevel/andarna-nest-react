import { createBrowserRouter } from 'react-router-dom';
import App from './app/app';
import { SignUpPage } from './pages';
import SignInPage from './pages/sign-in';
import ProfilePage from './pages/profile';

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
  {
    path: '/profile',
    element: <ProfilePage />,
  },
]);
