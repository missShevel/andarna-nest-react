import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useContext } from 'react';
import { AuthContext } from '../../firebase/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../features/user/userSlice';

const ProfilePage = () => {
  const { logOut } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading } = useAppSelector((state) => state.user);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log('User logged out successfully');
        dispatch(signOut());
        navigate('/sign-in'); // Redirect to the login page after logout
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h1>
        {' '}
        Welcome to Andarna {user?.firstName} {user?.lastName}{' '}
      </h1>
      <Button type="primary" onClick={handleLogOut}>
        Log out
      </Button>
    </>
  );
};

export default ProfilePage;
