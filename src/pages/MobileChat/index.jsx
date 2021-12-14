import * as React from "react";
import Box from "@mui/material/Box";
import NavBar from "../../Components/NavBar";
import { ChatContext } from "../../store/Context/ChatContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Divider, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { MobileContext } from "../../store/Context/MobileContext";
import Loader from "../../Components/Loader";
import AddUser from "../../Components/AddUser";

const MobileChat = React.memo(() => {
  document.title = "Lenxt Chat";
  const { contacts, profiles, myProfile, messages } =
    React.useContext(ChatContext);

  const { setClientMail, setMyMail, setMessagesMob } =
    React.useContext(MobileContext);
  const theme = useTheme();

  const navigate = useNavigate();
  if (myProfile?.email && messages && contacts && profiles) {
    if (contacts[0]) {
      return (
        <Box sx={{ overflow: "hidden" }}>
          <NavBar />
          <Box>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                minHeight: "90.37vh",
                flexDirection: "column",
                overflow: "auto",
              }}
            >
              {contacts &&
                contacts.map((contact, index) => {
                  console.log(index);
                  let contactId = contact.members.filter(
                    (item) => item !== myProfile?.email
                  );
                  contactId = contactId[0];
                  console.log(contactId);
                  let profileId = profiles.filter(
                    (pT) => pT.email === contactId
                  );
                  profileId = profileId[0];
                  let message = messages.filter((msg) => {
                    return msg.members.indexOf(profileId.email) !== -1;
                  });
                  if (message[0]) {
                    message = message[0];
                  }
                  if (profileId) {
                    return (
                      <Box
                        key={index}
                        onClick={() => {
                          setClientMail(profileId?.email);
                          setMyMail(myProfile?.email);
                          setMessagesMob(message.messages);
                          navigate("/chat");
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            p: 3,
                            alignItems: "center",
                          }}
                        >
                          <AccountCircleIcon
                            color="primary"
                            sx={{ transform: "scale(1.5)", p: 1, mr: 1 }}
                          />
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#343434" }}
                          >
                            {profileId.name}
                          </Typography>
                        </Box>
                        <Divider
                          sx={{
                            bgcolor: theme.palette.primary.main,
                            opacity: 0.4,
                            margin: "0 20px",
                          }}
                        />
                      </Box>
                    );
                  }
                })}
            </Box>
          </Box>
        </Box>
      );
    } else {
      return (
        <Box sx={{ overflow: "hidden" }}>
          <NavBar />
          <AddUser />
        </Box>
      );
    }
  } else {
    return (
      <Box sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
        <Loader />
      </Box>
    );
  }
});

export default MobileChat;
