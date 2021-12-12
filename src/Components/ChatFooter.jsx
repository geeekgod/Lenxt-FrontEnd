import { Box, IconButton, InputBase, Paper } from "@mui/material";
import React, { memo } from "react";
import SendIcon from "@mui/icons-material/Send";

const ChatFooter = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#DCC6FA",
        p: 0.4,
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
      >
        <InputBase
          sx={{ ml: 1, flex: 1, pt: 0.3, pb: 0.3 }}
          placeholder="Type a message"
          inputProps={{ "aria-label": "Type a message" }}
        />
      </Paper>
      <IconButton
        color="primary"
        aria-label="send message"
        sx={{ marginRight: 2, marginLeft: 1 }}
        component="span"
        size="large"
      >
        <SendIcon style={{ transform: "scale(1.4)" }} />
      </IconButton>
    </Box>
  );
};

export default memo(ChatFooter);