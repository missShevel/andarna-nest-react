import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import SliderLayout from './Layout';
import { AuthContext } from '../firebase/AuthProvider';

interface PrivateRouteProps {
  children: ReactNode;
}
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user: authUser, loading: authLoading } = useContext(AuthContext);
  const { user, isLoading } = useAppSelector((state) => state.user);

  if (authLoading || isLoading) return <div>Loading...</div>;

  if (user) {
    return <SliderLayout>{children}</SliderLayout>;
  }
  return <Navigate to="/sign-in" />;
};

export default PrivateRoute;
