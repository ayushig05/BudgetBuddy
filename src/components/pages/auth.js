import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { FcGoogle } from "react-icons/fc";

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
      email: result.user.email, 
      isAuth: true
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/tracker");
  };

  if (isAuth) {
    return <Navigate to="/tracker" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <FcGoogle className="mx-auto mb-4 text-6xl" />
        <p className="mb-4">Sign In With Google to Continue</p>
        <button
          onClick={SignInWithGoogle}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
