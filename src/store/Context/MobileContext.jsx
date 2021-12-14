import React, { createContext, useContext, useEffect, useState } from "react";
import { ChatContext } from "./ChatContext";

const MobileContext = createContext();

const MobileContextProvider = ({ children }) => {
  const [messagesMob, setMessagesMob] = useState();
  const [myMail, setMyMail] = useState("");
  const [clientMail, setClientMail] = useState("");

  const { messages } = useContext(ChatContext);

  useEffect(() => {
    let newMessage = messages.find((msg) => {
      return msg.members.indexOf(clientMail) !== -1;
    })
    setMessagesMob(newMessage?.messages);
  }, [messages]);

  return (
    <MobileContext.Provider
      value={{
        messagesMob,
        myMail,
        clientMail,
        setClientMail,
        setMyMail,
        setMessagesMob,
      }}
    >
      {children}
    </MobileContext.Provider>
  );
};

export { MobileContext, MobileContextProvider };
