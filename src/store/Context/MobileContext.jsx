import React, { createContext, useEffect, useState } from "react";

const MobileContext = createContext();

const MobileContextProvider = ({ children }) => {
  const [messages, setMessages] = useState();
  const [myMail, setMyMail] = useState("");
  const [clientMail, setClientMail] = useState("");

  return (
    <MobileContext.Provider
      value={{
        messages,
        myMail,
        clientMail,
        setClientMail,
        setMyMail,
        setMessages,
      }}
    >
      {children}
    </MobileContext.Provider>
  );
};

export { MobileContext, MobileContextProvider };
