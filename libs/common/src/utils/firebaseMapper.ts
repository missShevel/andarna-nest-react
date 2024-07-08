import IUserData from '../interfaces/user/auth';

const mapFirebaseUser = (firebaseData: any): IUserData => {
  const createdUser: IUserData = {
    fullName: firebaseData.displayName,
    email: firebaseData.email,
  };

  return createdUser;
};

export default mapFirebaseUser;
