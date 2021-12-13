import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import PersonIcon from "@mui/icons-material/Person";
import NavBar from "./NavBar";
import Chats from "./Chats";
import { Tabs } from "@mui/material";
import { ChatContext } from "../store/Context/ChatContext";

const DeskTopChat = React.memo(() => {
  document.title = "Lenxt Chat";
  const [value, setValue] = React.useState("0");
  const { contacts, profiles, myProfile, messages } =
    React.useContext(ChatContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if ((myProfile?._id, messages, contacts, profiles)) {
    return (
      <Box sx={{ overflow: "hidden" }}>
        <NavBar />
        <Box>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              height: "90.37vh",
            }}
          >
            <TabContext value={value}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                scrollButtons={false}
                value={value}
                onChange={handleChange}
                aria-label="Chats"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                {contacts &&
                  contacts.map((contact, index) => {
                    console.log(index);
                    let contactId = contact.members.filter(
                      (item) => item !== myProfile?._id
                    );
                    contactId = contactId[0];
                    console.log(contactId);
                    let profileId = profiles.filter(
                      (pT) => pT._id === contactId
                    );
                    profileId = profileId[0];
                    if (profileId) {
                      return (
                        <Tab
                          key={index}
                          icon={<PersonIcon />}
                          iconPosition="start"
                          label={profileId.name}
                          value={index.toString()}
                          sx={{
                            ml: 0,
                            width: 300,
                            justifyContent: "flex-start !important",
                          }}
                        />
                      );
                    }
                  })}
              </Tabs>
              {contacts &&
                contacts.map((contact, index) => {
                  let contactId = contact.members.filter(
                    (item) => item !== myProfile?._id
                  );
                  contactId = contactId[0];
                  let profileId = profiles.filter((pT) => pT._id === contactId);
                  profileId = profileId[0];
                  let message = messages.filter((msg) => {
                    return msg.members.indexOf(profileId._id) !== -1;
                  });
                  if (message[0]) {
                    message = message[0];
                  }
                  return (
                    <TabPanel
                      key={index}
                      sx={{ width: "100%", paddingBottom: 1, p: 0 }}
                      value={index.toString()}
                    >
                      <Chats
                        message={message}
                        myId={myProfile?._id}
                        clientId={profileId?._id}
                      />
                    </TabPanel>
                  );
                })}
            </TabContext>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return null;
  }
});

export default DeskTopChat;
