import { Box, Typography } from "@mui/material";
import React, { memo, useContext } from "react";
import ChatFooter from "./ChatFooter";
import ScrollToBottom from "react-scroll-to-bottom";
import { ChatContext } from "../store/Context/ChatContext";

const Chats = ({ message, myId, clientId }) => {
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
            {message.length !== 0 &&
              message.messages.map((msg, index) => {
                if (msg.id === myId) {
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
                          <Typography variant="body2">{msg.message}</Typography>
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
                          <Typography variant="body2">{msg.message}</Typography>
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
              })}
          </Box>
        </ScrollToBottom>
      </Box>
      <ChatFooter clientId={clientId} />
    </Box>
  );
};

export default memo(Chats);
