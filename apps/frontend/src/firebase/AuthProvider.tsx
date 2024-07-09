import { ReactNode, createContext, useEffect, useState } from 'react';
import { auth } from '.';
import { User, onAuthStateChanged } from 'firebase/auth';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  //   createUser: (email: string, password: string) => Promise<any>;
  //   loginUser: (email: string, password: string) => Promise<any>;
  //   logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as any);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);

      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authValue = {
    user,
    loading,
  };
  console.log(authValue);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
