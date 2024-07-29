const useGetUserInfo = () => {
  const authData = JSON.parse(localStorage.getItem("auth")) || {};
  const { name, profilePhoto, userID, isAuth, email } = authData;
  console.log("User Info:", authData);
  return { name, profilePhoto, userID, isAuth, email };
};

export default useGetUserInfo;
