import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useContext } from 'react';
import { AuthContext } from '../../firebase/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../features/user/userSlice';

const ProfilePage = () => {
  const { logOut, loading } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.user);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log('User logged out successfully');
        dispatch(signOut());
        navigate('/sign-in'); // Redirect to the login page after logout
      })
      .catch((error) => console.error(error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
