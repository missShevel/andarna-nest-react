interface IUserData {
  fullName: string;
  email: string;
}

const mapFirebaseUser = (firebaseData: any): IUserData => {
  const createdUser: IUserData = {
    fullName: firebaseData.user.displayName,
    email: firebaseData.user.email,
  };

  return createdUser;
};

export default mapFirebaseUser;
