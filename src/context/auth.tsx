import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  signIn as firebaseSignIn,
  signInWithAccessToken,
  signOut as firebaseSignOut,
} from "../firebase";
import { useToast } from "@chakra-ui/react";

interface AuthContext {
  isSignIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const ACCESS_TOKEN_KEY = "firebase-local-storage-access-token";

const authContext = createContext<AuthContext | null>(null);
authContext.displayName = "authContext";

export const AuthContextProvider = ({ children }: { children?: ReactNode }) => {
  const [isSignIn, setIsSignIn] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken == null) {
      return;
    }

    signInWithAccessToken(accessToken)
      .then(() => setIsSignIn(true))
      .catch(() => {
        console.error("access-token is not valid");
        localStorage.removeItem(ACCESS_TOKEN_KEY);
      });
  }, [setIsSignIn]);

  const signIn = async () => {
    try {
      const { user, token } = await firebaseSignIn();
      setIsSignIn(true);
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
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
