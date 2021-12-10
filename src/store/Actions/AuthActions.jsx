import React, { createContext, useContext } from "react";
import { AuthContenxt } from "../Context/AuthContext";

const AuthActions = createContext();

const AuthActionsProvider = (props) => {
  const { setUid, setAccessToken, userP, setUserP, localStorageSaver } =
    useContext(AuthContenxt);

  const authLoginSuccess = (uid, accessToken) => {
    setUid(uid);
    setAccessToken(accessToken);
    localStorageSaver(uid, accessToken);
  };

  const authLogout = () => {
    if (userP) {
      localStorage.clear();
      setUserP(false);
      setAccessToken(null);
      setUid(null);
    }
  };

  return (
    <AuthActions.Provider value={{ authLoginSuccess, authLogout }}>
      {props.children}
    </AuthActions.Provider>
  );
};

export { AuthActions, AuthActionsProvider };
