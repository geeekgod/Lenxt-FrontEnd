import { Box, Typography } from "@mui/material";
import React, { memo, useContext, useEffect, useState } from "react";
import ChatFooter from "./ChatFooter";
import ScrollToBottom from "react-scroll-to-bottom";
import { ChatContext } from "../store/Context/ChatContext";
import { SocketContext } from "../store/Context/SocketContext";

const Chats = ({ myMail, clientMail }) => {
  const { messages } = useContext(ChatContext);
  const [messageCon, setMessageCon] = useState(
    messages.find((msg) => {
      return msg.members.indexOf(clientMail) !== -1;
    })
  );
  useEffect(() => {
    setMessageCon(
      messages.find((msg) => {
        return msg.members.indexOf(clientMail) !== -1;
      })
    );
  }, [messages]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100%",
        backgroundColor: "transparent",
      }}
    >
      <Box>
        <ScrollToBottom className="chat-Box-Scroller">
          <Box sx={{ padding: "24px" }}>
            {messageCon?.messages
              ? messageCon.messages.map((msg, index) => {
                  if (msg.email === myMail) {
                    return (
                      <Box
                        key={index}
                        sx={{ display: "flex", justifyContent: "right" }}
                      >
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Box
                            sx={{
                              bgcolor: "#9757EF",
                              color: "#FFF",
                              mt: 0.3,
                              mb: 0.3,
                              p: 1,
                              borderRadius: 2,
                              maxWidth: 350,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ wordBreak: "break-all" }}
                            >
                              {msg.message}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ fontSize: 10, textAlign: "right", mr: 1 }}
                          >
                            {msg.time}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  } else {
                    return (
                      <Box key={index} sx={{ display: "flex" }}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Box
                            sx={{
                              bgcolor: "#FFD970",
                              mt: 0.3,
                              mb: 0.3,
                              p: 1,
                              borderRadius: 2,
                              maxWidth: 350,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ wordBreak: "break-all" }}
                            >
                              {msg.message}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ fontSize: 10 }}
                          >
                            {msg.time}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  }
                })
              : null}
          </Box>
        </ScrollToBottom>
      </Box>
      <ChatFooter clientMail={clientMail} />
    </Box>
  );
};

export default memo(Chats);
