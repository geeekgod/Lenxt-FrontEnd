import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { lenxtApi } from "../../api/lenxtApi";
import { ChatActions } from "../../store/Actions/ChatActions";
import { AuthContenxt } from "../../store/Context/AuthContext";
import { SocketContext } from "../../store/Context/SocketContext";

const AddNewContact = () => {
  document.title = "Add to contacts | Lenxt App";
  const navigate = useNavigate();
  const [serverMsg, setServerMsg] = useState("");
  const { uid, accessToken } = useContext(AuthContenxt);
  const { contactsFetcher, messagesFetcher } = useContext(ChatActions);
  const { socket } = useContext(SocketContext);

  const [searchEmail, setSearchEmail] = useState("");
  const [errMail, setErrMail] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [disableAddContact, setDisableAddContact] = useState(false);

  useEffect(() => {
    if (
      searchEmail.trim() !== "" &&
      searchEmail.indexOf("@") !== -1 &&
      searchEmail.indexOf(".") !== -1
    ) {
      setDisableAddContact(false);
    } else {
      setDisableAddContact(true);
    }
  }, [searchEmail]);

  const alertRenderer = () => {
    switch (serverMsg) {
      case "not you mail":
        return (
          <>
            {errMail !== false ? (
              <Alert severity="error">
                Please enter email other than your's!
              </Alert>
            ) : null}
          </>
        );
      case "client not found":
        return (
          <>
            {errMail !== false ? (
              <Alert severity="error">
                The User you are trying to look for does not exist!
              </Alert>
            ) : null}
          </>
        );
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    setErrMail(false);
    e.preventDefault();
    lenxtApi
      .post(
        "contacts/addNew",
        { clientMail: searchEmail },
        { headers: { uid: uid, "access-token": accessToken } }
      )
      .then((res) => {
        if (res.data.msg) {
          setServerMsg(res.data.msg);
          setDisableAddContact(true);
        }
        setSubmit(false);
      })
      .catch((err) => {
        console.log(err);
        setSubmit(false);
      });
  };

  useEffect(() => {
    switch (serverMsg) {
      case "contact already present":
        setTimeout(() => {
          navigate("/");
        }, 1500);
        break;
      case "not you mail":
        setErrMail(true);
        break;
      case "client not found":
        setErrMail(true);
        break;
      case "contact created":
        setErrMail(false);
        let data = {
          headers: { uid: uid, "access-token": accessToken },
          body: {
            clientMail: searchEmail,
          },
        };
        socket.emit("addContact", data);
        contactsFetcher();
        messagesFetcher();
        setTimeout(() => {
          navigate("/");
        }, 1500);
      default:
        setErrMail(false);
        break;
    }
  }, [serverMsg]);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        spacing={2}
        sx={{
          minHeight: "100vh",
          justifyContent: "center",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            {serverMsg === "contact created" ||
            serverMsg === "contact already present" ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <Box sx={{ height: "70vh" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "60%",
                      marginBottom: "auto",
                    }}
                  >
                    <CircularProgress
                      sx={{ marginTop: "auto", marginBottom: 5 }}
                    />
                    <Typography
                      component="h3"
                      variant="body1"
                      sx={{ marginTop: "auto", marginBottom: "auto" }}
                    >
                      Redirecting to chats
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography component="h1" variant="h5">
                  Add new contact
                </Typography>
                <Typography component="h4" variant="body1">
                  search to add by email
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1, padding: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={searchEmail}
                    onChange={(e) => {
                      setSearchEmail(e.target.value.toLowerCase());
                      if (errMail === true) {
                        setErrMail(false);
                      }
                    }}
                    error={errMail}
                  />
                  {/* Rendering alerts dynamically based on server response */}
                  {alertRenderer()}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disableElevation
                    disabled={submit ? true : disableAddContact}
                  >
                    Add User
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Container>
      </Grid>
    </Box>
  );
};

export default AddNewContact;
