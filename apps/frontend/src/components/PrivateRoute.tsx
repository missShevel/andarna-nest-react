import { getAuth } from 'firebase/auth';
import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../firebase/AuthProvider';
import { Spin } from 'antd';
import mapFirebaseUser from '../utils/firebaseMapper';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { signIn } from '../features/user/userSlice';
import axiosInstance from '../axios';

interface PrivateRouteProps {
  children: ReactNode;
}
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  // const { loading, user } = useContext(AuthContext);
  const user = useAppSelector((state) => state.user.user);
  // const dispatch = useAppDispatch();

  // console.log('aaaaaa', user);

  // if (loading) {
  //   return <div>Loading...</div>;
  //  <Spin spinning={spinning} percent={percent} fullscreen />
  // }
  //   const auth = getAuth();
  //   const currentUser = getAuth().currentUser;
  //   console.log(currentUser);
  if (user) {
    // const serializedUser = mapFirebaseUser(user);
    // dispatch(signIn(serializedUser));
    return children;
  }

  return <Navigate to="/sign-in" />;

  //   return currentUser ? <>{children}</> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
