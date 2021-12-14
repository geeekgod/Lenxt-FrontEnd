import React, { createContext, useEffect, useState } from "react";

const AuthContenxt = createContext();

const AuthContenxtProvider = ({ children }) => {
  const uidFetcher = () => {
    if (localStorage.getItem("uid")) {
      return parseInt(localStorage.getItem("uid"));
    } else return null;
  };
  const [uid, setUid] = useState(uidFetcher());
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access-token")
  );

  const userPresChecker = () => {
    if (uid && accessToken) {
      return true;
    } else {
      return false;
    }
  };

  const [userP, setUserP] = useState(userPresChecker());

  const localStorageSaver = (uid, accessToken) => {
    localStorage.setItem("uid", uid);
    localStorage.setItem("access-token", accessToken);
  };
  
  return (
    <AuthContenxt.Provider
      value={{
        uid,
        accessToken,
        setUid,
        setAccessToken,
        userP,
        setUserP,
        localStorageSaver,
      }}
    >
      {children}
    </AuthContenxt.Provider>
  );
};

export { AuthContenxt, AuthContenxtProvider };
