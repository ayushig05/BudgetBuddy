const useGetUserInfo = () => {
  const authData = JSON.parse(localStorage.getItem("auth")) || {};
  const { name, profilePhoto, userID, isAuth } = authData;
  console.log("User Info:", authData);
  return { name, profilePhoto, userID, isAuth };
};

export default useGetUserInfo;
