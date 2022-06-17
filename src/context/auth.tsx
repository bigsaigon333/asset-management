import { createContext, ReactNode, useContext, useState } from "react";
import { signIn as firebaseSignIn } from "../firebase";

interface AuthContext {
  isSignIn: boolean;
  signIn: () => Promise<void>;
}

const authContext = createContext<AuthContext | null>(null);
authContext.displayName = "authContext";

export const AuthContextProvider = ({ children }: { children?: ReactNode }) => {
  const [isSignIn, setIsSignIn] = useState(false);

  const signIn = async () => {
    try {
      const user = await firebaseSignIn();
      setIsSignIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <authContext.Provider value={{ isSignIn, signIn }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);

  if (context == null) {
    throw new Error("Invalid AuthContext");
  }

  return context;
};
