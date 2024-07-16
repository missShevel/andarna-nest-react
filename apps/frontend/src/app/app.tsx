import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUpPage } from '../pages';
import SignInPage from '../pages/sign-in';
import ProfilePage from '../pages/profile';
import HomePage from '../pages/home';
import PrivateRoute from '../components/PrivateRoute';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../firebase/AuthProvider';
import { useAppDispatch } from './hooks';
import { signIn } from '../features/user/userSlice';
import axiosInstance from '../axios';
import { ApiEndpoints } from '../enum/apiEndpoints';
import { IUser } from '@andarna/common';

export function App() {
  const { loading, user } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const foo = async () => {
      if (user) {
        console.log(user);
        const { data: userFromDb } = await axiosInstance.get<IUser>(
          ApiEndpoints.GET_ME,
          {
            headers: {
              Authorization: `Bearer ${await user.getIdToken()}`,
            },
          }
        );
        dispatch(signIn(userFromDb));
      }
    };
    foo();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
    //  <Spin spinning={spinning} percent={percent} fullscreen />
  }
  //   const auth = getAuth();
  //   const currentUser = getAuth().currentUser;
  //   console.log(currentUser);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
