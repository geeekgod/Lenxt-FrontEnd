import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Login} from '@mui/icons-material';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import signInImg from "./assets/imgs/signin.png";
import { FormControlLabel, FormGroup, Checkbox } from "@mui/material";

export default function App() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [disableLogin, setDisableLogin] = React.useState(false);

  React.useEffect(() => {
    if (
      email !== "" &&
      email !== " " &&
      password !== "" &&
      password !== " " &&
      password.length > 7 &&
      email.indexOf("@") != -1 &&
      email.indexOf(".") != -1
    ) {
      setDisableLogin(false);
    } else {
      setDisableLogin(true);
    }
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      email: email,
      password: password,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <img src={signInImg} style={{ width: "100%" }} />
      </Grid>
      <Grid item md={6} sx={{ justifyContent: "center", margin: "auto" }}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Welcome Back to <b style={{fontWeight: 600}}>LENXT</b>
            </Typography>
            <Typography component="h2" variant="h5">
              Sign to your account
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disableElevation
                disabled={disableLogin}
                endIcon={<Login/>}
              >
                Sign In
              </Button>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showPassword}
                      onChange={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  }
                  label="Show Password"
                />
              </FormGroup>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
