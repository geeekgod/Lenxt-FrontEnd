import {
  Box,
  Typography,
  Container,
  Link,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import notFoundImg from "../../assets/imgs/notfound.png";

const NotFound = () => {
  const navigation = useNavigate();

  useEffect(() => {
    document.title = "404 error | Lenxt";
  }, []);
  return (
    <>
      <Box>
        <Container maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <Box>
              <img src={notFoundImg} style={{ width: "90%" }} />
              <Typography variant="h5" component="h4" gutterBottom>
                Oops, the page you are looking for can't be found!
              </Typography>
              <Link
                component="button"
                variant="body1"
                onClick={() => {
                  setTimeout(() => {
                    navigation("/");
                  }, 500);
                }}
              >
                Go back to home page
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;
