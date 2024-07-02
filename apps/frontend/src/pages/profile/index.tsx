import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const user = useSelector((state: any) => state.user.user);
  if (!user) {
    return <div>No user signed in</div>;
  }

  return <h1> Welcome to Andarna {user.fullName}</h1>;
};

export default ProfilePage;
