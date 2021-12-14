import { Box, Typography, Container, Link, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import adduser from "../assets/imgs/adduser.png";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const AddUser = () => {
  const navigation = useNavigate();
  return (
    <>
      <Box>
        <Container maxWidth='xs'>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img src={adduser} alt='adduser' style={{ width: "100%" }} />
              <Typography variant='h5' component='h4' gutterBottom>
                Looks like you have no contacts
              </Typography>
              <Button
                variant='contained'
                disableElevation
                endIcon={<PersonAddIcon />}
                sx={{ mt: 1 , p: "10px 20px"}}
                onClick={() => {
                  setTimeout(() => {
                    navigation("/add-contact");
                  }, 500);
                }}
              >
                Add New Contact
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default AddUser;
