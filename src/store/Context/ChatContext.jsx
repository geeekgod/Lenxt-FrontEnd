import React, { createContext, useEffect, useState } from "react";

const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [myProfile, setMyProfile] = useState([]);

  useEffect(() => {
    console.log("contacts: ", contacts);
    console.log("profiles: ", profiles);
    console.log("myProfile: ", myProfile);
    console.log("messages: ", messages);
  }, [contacts, profiles, myProfile, messages]);
  return (
    <ChatContext.Provider
      value={{
        contacts,
        profiles,
        myProfile,
        messages,
        setContacts,
        setProfiles,
        setMyProfile,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
