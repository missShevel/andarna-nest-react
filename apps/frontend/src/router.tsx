import { createBrowserRouter } from 'react-router-dom';
import App from './app/app';
import { SignUpPage } from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
]);
