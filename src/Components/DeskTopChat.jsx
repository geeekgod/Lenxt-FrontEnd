import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import PersonIcon from "@mui/icons-material/Person";
import NavBar from "./NavBar";
import Chats from "./Chats";
import { Tabs } from "@mui/material";

const DeskTopChat = React.memo(() => {
  const myId = "10";
  const [value, setValue] = React.useState("0");
  const [conversations, setConversations] = React.useState([
    {
      id: "1",
      userName: "John Doe",
    },
    {
      id: "2",
      userName: "Rishabh Singh",
    },
    {
      id: "3",
      userName: "Shreya Shet",
    },
    {
      id: "4",
      userName: "Lol LOl LOl",
    },
    {
      id: "5",
      userName: "Newbie",
    },
    {
      id: "6",
      userName: "Tester",
    },
    {
      id: "7",
      userName: "React Org",
    },
    {
      id: "8",
      userName: "No org",
    },
    {
      id: "9",
      userName: "Test Org",
    },
  ]);

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
          v: "1",
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

  return (
    <Box>
      <NavBar />
      <Box>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: "88.45vh",
          }}
        >
          <TabContext value={value}>
            <Tabs
              orientation='vertical'
              variant='scrollable'
              scrollButtons={false}
              value={value}
              onChange={handleChange}
              aria-label='Chats'
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              {conversations &&
                conversations.map((conversation, index) => {
                  console.log(index);
                  return (
                    <Tab
                      key={index}
                      icon={<PersonIcon />}
                      iconPosition='start'
                      label={conversation.userName}
                      value={index.toString()}
                      sx={{
                        ml: 0,
                        width: 300,
                        justifyContent: "flex-start !important",
                      }}
                    />
                  );
                })}
            </Tabs>
            {conversations &&
              conversations.map((conversation, index) => {
                let message = messages.filter((msg) => {
                  return msg.clients.indexOf(conversation.id) !== -1;
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
                      conversation={conversation}
                      message={message}
                      myId={myId}
                    />
                  </TabPanel>
                );
              })}
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
});

export default DeskTopChat;
