import React, { createContext, useEffect, useState } from "react";

const AuthContenxt = createContext();

const AuthContenxtProvider = (props) => {
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

  useEffect(() => {
    console.log("uid:", uid);
    console.log("access-token", accessToken);
    console.log("user present:", userP);
  }, [uid, accessToken, userP]);

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
      {props.children}
    </AuthContenxt.Provider>
  );
};

export { AuthContenxt, AuthContenxtProvider };
