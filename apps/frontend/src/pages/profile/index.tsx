import { useAppSelector } from '../../app/hooks';

const ProfilePage = () => {
  const user = useAppSelector((state) => state.user.user);
  if (!user) {
    return <div>No user signed in</div>;
  }

  return <h1> Welcome to Andarna {user.fullName}</h1>;
};

export default ProfilePage;
