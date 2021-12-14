import { Box, Typography } from "@mui/material";
import React, { memo, useContext, useEffect } from "react";
import ChatFooter from "./ChatFooter";
import ScrollToBottom from "react-scroll-to-bottom";
import { MobileContext } from "../store/Context/MobileContext";
import { useNavigate } from "react-router";
import NavBar from "./NavBar";

const MobileChatComp = () => {
  const { messagesMob, myMail, clientMail } = useContext(MobileContext);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      if (messagesMob === undefined && myMail === "" && clientMail === "") {
        navigate("/");
      }
    }, 2000);
  }, []);
  if ((messagesMob !== undefined, myMail, clientMail)) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
          backgroundColor: "transparent",
        }}
      >
        <NavBar />
        <Box>
          <ScrollToBottom className="chat-Box-Scroller mobile">
            <Box sx={{ padding: "24px" }}>
              {messagesMob.length !== 0 &&
                messagesMob.map((msg, index) => {
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
                            <Typography variant="body2">
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
                            <Typography variant="body2">
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
                })}
            </Box>
          </ScrollToBottom>
        </Box>
        <ChatFooter clientMail={clientMail} />
      </Box>
    );
  } else {
    return null;
  }
};

export default memo(MobileChatComp);
