import { ReactNode, createContext, useEffect, useState } from 'react';
import { auth } from '.';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import axiosInstance from '../axios';
import { ApiEndpoints } from '../enum/apiEndpoints';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<any>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as any);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredentials.user, {
        displayName: `${firstName} ${lastName}`,
      });
      const firebaseCreatedUser = {
        firstName: firstName,
        lastName: lastName,
        email,
        firebaseId: userCredentials.user.uid,
      };
      const response = await axiosInstance.post(
        ApiEndpoints.CREATE_USER,
        firebaseCreatedUser
      );
      console.log(response);
    } catch (e: any) {
      // TODO error handling on the screen
      console.log(e.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      // TODO error handling on the screen
      console.log(e.message);
    }
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setLoading(false);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  const authValue = {
    user,
    logOut,
    loading,
    signUp,
    signIn,
  };
  console.log(authValue);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
