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
  const { contacts, profiles, myProfile } = React.useContext(ChatContext);

  // const [profile, setProfile] = React.useState([
  //   {
  //     _id: "1",
  //     name: "John Doe",
  //   },
  //   {
  //     _id: "2",
  //     name: "Rishabh Singh",
  //   },
  //   {
  //     _id: "3",
  //     name: "Shreya Shet",
  //   },
  //   {
  //     _id: "4",
  //     name: "Lol LOl LOl",
  //   },
  //   {
  //     _id: "5",
  //     name: "Newbie",
  //   },
  //   {
  //     _id: "6",
  //     name: "Tester",
  //   },
  //   {
  //     _id: "7",
  //     name: "React Org",
  //   },
  //   {
  //     _id: "8",
  //     name: "No org",
  //   },
  //   {
  //     _id: "9",
  //     name: "Test Org",
  //   },
  // ]);
  // const [contacts, setcontacts] = React.useState([
  //   {
  //     members: ["1", "10"],
  //   },
  //   {
  //     members: ["2", "10"],
  //   },
  //   {
  //     members: ["3", "10"],
  //   },
  //   {
  //     members: ["4", "10"],
  //   },
  //   {
  //     members: ["5", "10"],
  //   },
  //   {
  //     members: ["6", "10"],
  //   },
  //   {
  //     members: ["7", "10"],
  //   },
  //   {
  //     members: ["8", "10"],
  //   },
  //   {
  //     members: ["9", "10"],
  //   },
  // ]);

  const [messages, setMessages] = React.useState([
    {
      clients: ["1", "10"],
      messages: [
        {
          id: "1",
          name: "Joh Doe",
          message: "hey",
          time: "13:47",
        },
        {
          id: "10",
          name: "Lenxt Person",
          message: "Hey",
          time: "13:47",
        },
        {
          id: "1",
          name: "Joh Doe",
          message: "How are you ",
          time: "13:47",
        },
        {
          id: "1",
          name: "Joh Doe",
          message: "This is a test message",
          time: "13:47",
        },
        {
          id: "1",
          name: "Joh Doe",
          message: "i hope you recive react js mastery",
          time: "13:47",
        },
        {
          id: "10",
          name: "Lenxt Person",
          message: "Thank you so much",
          time: "13:47",
        },
        {
          id: "10",
          name: "Lenxt Person",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra ullamcorper orci eget mollis. In viverra lectus euismod fringilla luctus. Vestibulum laoreet luctus imperdiet. Sed nec sagittis magna.",
          time: "13:47",
        },
        {
          id: "1",
          name: "Joh Doe",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra ullamcorper orci eget mollis. In viverra lectus euismod fringilla luctus. Vestibulum laoreet luctus imperdiet. Sed nec sagittis magna.",
          time: "13:47",
        },
        {
          id: "1",
          name: "Joh Doe",
          message: "hey",
          time: "13:47",
        },
        {
          id: "10",
          name: "Lenxt Person",
          message: "Hello",
          time: "13:47",
        },
      ],
    },
    {
      clients: ["2", "10"],
      messages: [
        {
          id: "2",
          name: "Rishabh Singh",
          message: "hi",
          time: "12:47",
        },
        {
          id: "2",
          name: "Rishabh Singh",
          message: "Hope you are good ",
          time: "13:47",
        },
        {
          id: "10",
          name: "Lenxt Person",
          message: "Hello",
          time: "13:47",
        },
        {
          id: "10",
          name: "Lenxt Person",
          message: "Hello",
          time: "13:47",
        },
        {
          id: "10",
          name: "Lenxt Person",
          message: "Hello",
          time: "13:47",
        },
        {
          id: "2",
          name: "Rishabh Singh",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra ullamcorper orci eget mollis. In viverra lectus euismod fringilla luctus. Vestibulum laoreet luctus imperdiet. Sed nec sagittis magna.",
          time: "13:47",
        },
      ],
    },
    {
      clients: ["3", "10"],
      messages: [
        {
          id: "3",
          name: "Shreya Shet",
          message: "hieeee",
          time: "12:47",
        },
        {
          id: "3",
          name: "Shreya Shet",
          message: "Wyd",
          time: "13:47",
        },
      ],
    },
    {
      clients: ["4", "10"],
      messages: [
        {
          id: "4",
          name: "Lol LOl LOl",
          message: "hey",
          time: "12:47",
        },
        {
          id: "4",
          name: "Lol LOl LOl",
          message: "we will start production soon",
          time: "13:47",
        },
      ],
    },
    {
      clients: ["10", "5"],
      messages: [
        {
          id: "5",
          name: "Newbie",
          message: "hey",
          time: "12:47",
        },
        {
          id: "5",
          name: "Lol LOl LOl",
          message: "This is Newbie here",
          time: "13:47",
        },
      ],
    },
    {
      clients: ["10", "6"],
      messages: [
        {
          id: "6",
          name: "Newbie",
          message: "hey",
          time: "12:47",
        },
        {
          id: "6",
          name: "Lol LOl LOl",
          message: "This is Newbie here",
          time: "13:47",
        },
      ],
    },
    {
      clients: ["10", "7"],
      messages: [
        {
          id: "7",
          name: "Newbie",
          message: "hey",
          time: "12:47",
        },
        {
          id: "7",
          name: "Lol LOl LOl",
          message: "This is Newbie here",
          time: "13:47",
        },
      ],
    },
    {
      clients: ["10", "8"],
      messages: [
        {
          id: "8",
          name: "Newbie",
          message: "hey",
          time: "12:47",
        },
        {
          id: "8",
          name: "Lol LOl LOl",
          message: "This is Newbie here",
          time: "13:47",
        },
      ],
    },
    {
      clients: ["10", "9"],
      messages: [
        {
          id: "9",
          name: "Newbie",
          message: "hey",
          time: "12:47",
        },
        {
          id: "9",
          name: "Lol LOl LOl",
          message: "This is Newbie here",
          time: "13:47",
        },
      ],
    },
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (myProfile?._id) {
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
                  console.log(contactId);
                  let profileId = profiles.filter((pT) => pT._id === contactId);
                  profileId = profileId[0];
                  let message = messages.filter((msg) => {
                    return msg.clients.indexOf(profileId._id) !== -1;
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
                      <Chats message={message} myId={myProfile?._id} />
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
