import React, { createContext, useEffect, useState } from "react";

const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [myProfile, setMyProfile] = useState([]);

  useEffect(() => {
    console.log("contacts: ", contacts);
    console.log("profiles: ", profiles);
    console.log("myProfile: ", myProfile);
  }, [contacts, profiles, myProfile]);
  return (
    <ChatContext.Provider
      value={{
        contacts,
        profiles,
        myProfile,
        setContacts,
        setProfiles,
        setMyProfile,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
