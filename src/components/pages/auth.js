import React from "react";
import { 
  auth, 
  provider 
} from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import useGetUserInfo from "../hooks/useGetUserInfo";

const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const SignInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    const authInfo = {
      userID: result.user.uid,
      name: result.user.displayName,
      profilePhoto: result.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/tracker");
  };

  if (isAuth) {
    return <Navigate to="/tracker" />;
  }

  return (
    <div>
      <p>Sign In With Google to Continue</p>
      <button onClick={SignInWithGoogle}>Sign In With Google</button>
    </div>
  );
};

export default Auth;
