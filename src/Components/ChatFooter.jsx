import { Box, IconButton, InputBase, Paper } from "@mui/material";
import React, { memo, useContext, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { ChatActions } from "../store/Actions/ChatActions";
import { ChatContext } from "../store/Context/ChatContext";

const ChatFooter = ({ clientMail }) => {
  const { myProfile } = useContext(ChatContext);
  const { sendMessage } = useContext(ChatActions);

  const [text, setText] = useState("");

  const sendMsg = () => {
    if (text !== "" && text !== " ") {
      const msgData = {
        email: myProfile.email,
        name: myProfile.name,
        message: text,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      sendMessage(msgData, clientMail);
    }
  };

  const handleSubmit = () => {
    if (text.trim() !== "") {
      sendMsg();
      setText("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#DCC6FA",
        p: 0.4,
        marginTop: "auto",
        marginBottom: 0,
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: 10,
        }}
        elevation={0}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <InputBase
          value={text}
          sx={{ ml: 1, flex: 1, pt: 0.3, pb: 0.3 }}
          placeholder="Type a message"
          inputProps={{ "aria-label": "Type a message" }}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </Paper>
      <IconButton
        color="primary"
        aria-label="send message"
        sx={{
          marginRight: 2,
          marginLeft: 1,
          opacity: text.trim() !== "" ? 1 : 0,
        }}
        component="span"
        size="large"
        onClick={handleSubmit}
      >
        <SendIcon style={{ transform: "scale(1.4)" }} />
      </IconButton>
    </Box>
  );
};

export default memo(ChatFooter);
