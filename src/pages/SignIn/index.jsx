import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Login } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import signInImg from "../../assets/imgs/signin.png";
import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import { Link as RLink } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableLogin, setDisableLogin] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (
      email !== "" &&
      email !== " " &&
      password !== "" &&
      password !== " " &&
      password.length > 7 &&
      email.indexOf("@") !== -1 &&
      email.indexOf(".") !== -1
    ) {
      setDisableLogin(false);
    } else {
      setDisableLogin(true);
    }
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    setTimeout(() => {
      console.log({
        email: email,
        password: password,
      });
      setSubmit(false);
    }, 3000);
  };

  useEffect(() => {
    document.title = "Sign In | Lenxt";
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={signInImg} style={{ width: "90%" }} alt={"Sign In Image"} />
        </Grid>
        <Grid item md={6} sx={{ justifyContent: "center", margin: "auto" }}>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Typography component="h1" variant="h5">
                Welcome Back to <b style={{ fontWeight: 600 }}>LENXT</b>
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
                  disabled={submit ? true : disableLogin}
                  endIcon={submit ? null : <Login />}
                >
                  {submit ? (
                    <CircularProgress size={25} color="inherit" />
                  ) : (
                    "Sign In"
                  )}
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
                    <RLink to="/auth/signup">
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </RLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
