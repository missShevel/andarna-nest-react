interface IUserData {
  fullName: string;
  email: string;
}

const mapFirebaseUser = (firebaseData: any): IUserData => {
  console.log('firebase user', firebaseData);

  const createdUser: IUserData = {
    fullName: firebaseData.user.displayName,
    email: firebaseData.user.email,
  };

  return createdUser;
};

export default mapFirebaseUser;
