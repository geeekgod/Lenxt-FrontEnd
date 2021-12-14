import { Box, Container, Grid, Link, Typography } from "@mui/material";
import React from "react";
import TeamCards from "../../Components/Cards";
import rishabhImg from "../../assets/imgs/rishabh_img.jpg";
import shreyaImg from "../../assets/imgs/shreya_img.jpeg";
import aditiImg from "../../assets/imgs/aditi_img.jpeg";
import { Link as Rlink } from "react-router-dom";

const data = [
  {
    name: "Rishabhkumar Singh",
    img: rishabhImg,
    position: "Full-Stack Developer",
    linkedIn: "https://www.linkedin.com/in/rishabhh-singh/",
    gitHub: "https://github.com/thisisrishabh22",
  },
  {
    name: "Shreya Shet",
    img: shreyaImg,
    position: "Front-End Developer",
    linkedIn: "https://www.linkedin.com/in/shreyaa-shet/",
    gitHub: "https://github.com/shreyaaashet",
  },
  {
    name: "Aditi Thakre",
    img: aditiImg,
    position: "Back-End Developer",
    linkedIn: "https://www.linkedin.com/in/aditi-thakre-3554a0221/",
    gitHub: "https://github.com/AditiThakre05",
  },
];

const AboutUs = () => {
  return (
    <Box sx={{ pt: 2, pb: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        sx={{ mt: 2, mb: 2, textAlign: "center" }}
      >
        Lenxt Developers
      </Typography>
      <Container>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {data &&
            data.map((item, index) => (
              <Grid item key={index} md={4}>
                <TeamCards item={item} />
              </Grid>
            ))}
        </Grid>
        <Box sx={{ p: 2 }}>
          <Rlink style={{ marginTop: "10px", padding: 2 }} to="/">
            <Link>Go back</Link>
          </Rlink>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
