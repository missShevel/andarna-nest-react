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
import { useAppDispatch } from '../app/hooks';
import { findOrCreateUser } from '../features/user/userSlice';
import { AppDispatch } from '../app/store';

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
  const dispatch = useAppDispatch();

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredentials.user, {
        displayName: `${firstName} ${lastName}`,
      });
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
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        console.log('authStateChanged', currentUser);

        dispatch(findOrCreateUser(currentUser));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authValue = {
    user,
    loading,
    logOut,
    signUp,
    signIn,
  };
  console.log(authValue);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
