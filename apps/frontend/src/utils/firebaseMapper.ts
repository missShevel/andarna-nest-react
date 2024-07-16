import { IUserData } from '../interface/user';

const mapFirebaseUser = (firebaseData: any): IUserData => {
  console.log('firebase user', firebaseData);

  const createdUser: IUserData = {
    fullName: firebaseData.displayName,
    email: firebaseData.email,
  };

  return createdUser;
};

export default mapFirebaseUser;
