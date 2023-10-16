"use client";
import { AuthinticationContext } from "@/context/auth-context";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-hot-toast";
export interface SignInProps {
  email: string;
  password: string;
}
export interface SignUpProps extends SignInProps {
  first_name: string;
  last_name: string;
  city: string;
  phone: string;
}
const useAuth = () => {
  const { loading, data, error, setAuthState } = useContext(
    AuthinticationContext
  );
  // Start of Sign In Function
  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setAuthState({
      loading: true,
      data: null,
      error: null,
      isSignIn:false,
    });
    try {
      const res = await axios.post("/api/auth/signin", {
        email,
        password,
      });
      setAuthState({
        loading: false,
        data: res.data.message,
        error: null,
        isSignIn:true,
      });
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.message,
        isSignIn:false,
      });
    }
  };
  // Start of Sign Up Function
  const signUp = async ({ userInput }: { userInput: SignUpProps }) => {
    try {
      setAuthState({
        loading: true,
        data: null,
        error: null,
        isSignIn:false,
        isSuccessfulSignUp:false,
      });
      const res = await axios.post("/api/auth/signup", userInput);
      setAuthState({
        loading: false,
        data: res.data.message,
        error: null,
        isSignIn:false,
        isSuccessfulSignUp:true,
      });
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.message,
        isSignIn:false,
      });
    }
  };
  // Start of Sign Out Function
  const signOut = async () => {
    try {
      setAuthState({
        loading: true,
        data: null,
        error: null,
        isSignIn:true,
      });
      const res = await axios.delete("/api/auth/signout");
      setAuthState({
        loading: false,
        data: res.data.message,
        error: null,
        isSignIn:false,
      });
      toast.success(`${res.data.message}`, {
        duration: 5000,
        position: "top-left",
      });
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: error.response.data.message,
        error: null,
      });
      toast.error(`${error.response.data.message}`, {
        duration: 5000,
        position: "top-left",
      });
    }
  };
  return { signIn, signOut, signUp };
};

export default useAuth;
