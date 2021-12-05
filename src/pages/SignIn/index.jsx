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
  useTheme,
  Alert,
} from "@mui/material";
import { Link as RLink, useNavigate } from "react-router-dom";
import { lenxtApi } from "../../api/lenxtApi";

const SignIn = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableLogin, setDisableLogin] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [errPswd, setErrPswd] = useState(false);
  const [errMail, setErrMail] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

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
    setErrMail(false);
    setErrPswd(false);
    setErrorMsg(null);
    setLoginSuccess(false);
    lenxtApi
      .post("/auth/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.err && res.data.err === "Incorrect Password") {
          setErrorMsg("Incorrect Password");
          setErrPswd(true);
          console.log(errorMsg);
          setLoginSuccess(false);
        }
        if (res.data.message && res.data.message?.message === "Logged in!!") {
          setErrorMsg(null);
          console.log(res.data);
          setLoginSuccess(true);
          setDisableLogin(true);
        }
        setSubmit(false);
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response &&
          err.response.data.err === "User not found please register"
        ) {
          setErrorMsg("User doesn't exists please register");
          console.log("err: ", errorMsg);
          setErrMail(true);
          setLoginSuccess(false);
        }
        setSubmit(false);
      });
  };

  useEffect(() => {
    document.title = "Sign In | Lenxt";
  }, []);

  return (
    <>
      <Grid container spacing={2} sx={{ minHeight: "100vh" }}>
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
                Welcome Back to{" "}
                <b
                  style={{ fontWeight: 600, color: theme.palette.primary.main }}
                >
                  LENXT
                </b>
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
                    if (errMail === true) {
                      setErrMail(false);
                    }
                    setErrorMsg(null);
                  }}
                  error={errMail}
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
                    if (errPswd === true) {
                      setErrPswd(false);
                    }
                    setErrorMsg(null);
                  }}
                  error={errPswd}
                />
                {errorMsg && errPswd ? (
                  <Alert severity="error">{errorMsg}</Alert>
                ) : null}
                {errorMsg && errMail ? (
                  <Alert severity="error">{errorMsg}</Alert>
                ) : null}
                {!errorMsg && !errMail && !errPswd && loginSuccess ? (
                  <Alert severity="success">Signin successful!</Alert>
                ) : null}
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
                <Grid container sx={{ paddingTop: 2 }}>
                  <Grid item xs>
                    <RLink to="/auth/forgot-password">
                      <Link href="#" variant="body2">
                        {"Forgot Password"}
                      </Link>
                    </RLink>
                  </Grid>
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
