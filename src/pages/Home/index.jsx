import { ArrowForwardIos } from "@mui/icons-material";
import {
  Box,
  Grid,
  useTheme,
  Typography,
  Container,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import landingImg from "../../assets/imgs/landing.png";
import { getWindowDimensions } from "../../utils/getWidth";

const Home = () => {
  const theme = useTheme();
  const navigation = useNavigate();

  useEffect(() => {
    document.title = "Lenxt";
  }, []);

  const [flexDir, setFlexDir] = useState("row");
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowDimensions]);

  useEffect(() => {
    if (windowDimensions < 900) {
      setFlexDir("column-reverse");
    } else {
      setFlexDir("row");
    }
  }, [windowDimensions]);
  return (
    <>
      <Box>
        <Grid
          container
          spacing={2}
          sx={{ minHeight: "100vh", justifyContent: "center" }}
          direction={flexDir}
        >
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Container maxWidth="xs">
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{ fontWeight: 600, color: "#3867A8" }}
              >
                Converse. Chat. Connect
              </Typography>
              <Typography variant="h4" component="h5" gutterBottom>
                Chat & discover the world with{" "}
                <b
                  style={{ fontWeight: 600, color: theme.palette.primary.main }}
                >
                  Lenxt
                </b>
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                Smart application for smart users.connect with ur close ones
                through lenxt. Getting started with computer vision. Lenxt
                provides u the speed and ease you need
              </Typography>
              <Button
                variant="contained"
                sx={[
                  {
                    paddingTop: 1.4,
                    paddingBottom: 1.4,
                    marginTop: 3.4,
                    fontSize: 14.7,
                    paddingLeft: 3,
                    paddingRight: 3,
                  },
                  () => ({
                    "&:hover": {
                      transform: `translateY(-10px)`,
                    },
                  }),
                ]}
                className="button-custom"
                disableElevation
                endIcon={<ArrowForwardIos />}
                onClick={() => {
                  setTimeout(() => {
                    navigation("/auth/signup");
                  }, 500);
                }}
              >
                Get Started
              </Button>
            </Container>
          </Grid>
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={landingImg} style={{ width: "90%" }} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
