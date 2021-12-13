import React, { createContext, useEffect, useState } from "react";

const MobileContext = createContext();

const MobileContextProvider = ({ children }) => {
  const [messages, setMessages] = useState();
  const [myId, setMyId] = useState("");
  const [clientId, setClientId] = useState("");

  return (
    <MobileContext.Provider
      value={{
        messages,
        myId,
        clientId,
        setClientId,
        setMyId,
        setMessages,
      }}
    >
      {children}
    </MobileContext.Provider>
  );
};

export { MobileContext, MobileContextProvider };
