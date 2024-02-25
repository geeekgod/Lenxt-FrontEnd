import React, { createContext, useContext, useEffect } from "react";
import io from "socket.io-client";
import { AuthContenxt } from "./AuthContext";

const API_URL = process.env.REACT_APP_API_URL;

const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const socket = io.connect(API_URL, {
    transports: ["websocket", "polling", "flashsocket"],
  });

  const { uid, accessToken } = useContext(AuthContenxt);

  useEffect(() => {
    socket.emit("updateUser", uid, accessToken);
  });
  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketContextProvider };
