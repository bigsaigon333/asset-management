import { createContext, ReactNode, useContext, useState } from "react";
import {
  signIn as firebaseSignIn,
  signOut as firebaseSignOut,
} from "../firebase";
import { useToast } from "@chakra-ui/react";

interface AuthContext {
  isSignIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const authContext = createContext<AuthContext | null>(null);
authContext.displayName = "authContext";

export const AuthContextProvider = ({ children }: { children?: ReactNode }) => {
  const [isSignIn, setIsSignIn] = useState(false);

  const toast = useToast();

  const signIn = async () => {
    try {
      const user = await firebaseSignIn();
      setIsSignIn(true);
    } catch (error) {
      console.error(error);
      toast({
        title: "로그인에 실패하였습니다.",
        status: "error",
        position: "top",
      });
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut();
      setIsSignIn(false);
      toast({
        title: "로그아웃되었습니다",
        status: "success",
        position: "top",
      });
    } catch (error) {
      console.error();
      toast({
        title: "로그아웃에 실패하였습니다.",
        status: "error",
        position: "top",
      });
    }
  };

  return (
    <authContext.Provider value={{ isSignIn, signIn, signOut }}>
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
