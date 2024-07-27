import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

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

  return (
    <div>
      <p>Sign In With Google to Continue</p>
      <button onClick={SignInWithGoogle}>Sign In With Google</button>
    </div>
  );
};

export default Auth;
