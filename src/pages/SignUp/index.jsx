import React, { memo, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { LockOpen } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import signUpImg from "../../assets/imgs/signup.png";
import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  Alert,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Link as RLink, useNavigate } from "react-router-dom";
import { getWindowDimensions } from "../../utils/getWidth";
import { lenxtApi } from "../../api/lenxtApi";
import { passStrengthChecker } from "../../utils/passStrengthChecker";

const SignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [disableSignUp, setDisableSignUp] = useState(false);
  const [errPswd, setErrPswd] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [flexDir, setFlexDir] = useState("row");
  const [errMail, setErrMail] = useState(false);
  const [signupSuccess, setsignupSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [passIsWeak, setPassIsWeak] = useState(false);

  useEffect(() => {
    const cnfPssLen = cnfPassword.length;
    const pssLen = password.length;
    const nameLen = name.length;
    if (
      email !== "" &&
      email !== " " &&
      name !== "" &&
      name !== " " &&
      password !== "" &&
      password !== " " &&
      cnfPassword !== "" &&
      cnfPassword !== " "
    ) {
      if (
        nameLen > 7 &&
        pssLen > 7 &&
        cnfPssLen > 7 &&
        email.indexOf("@") !== -1 &&
        email.indexOf(".") !== -1
      ) {
        setDisableSignUp(false);
      } else {
        setDisableSignUp(true);
      }
    } else {
      setDisableSignUp(true);
    }
  }, [email, password, cnfPassword, name]);

  const passCheck = () => {
    const strength = passStrengthChecker(password);
    console.log(passStrengthChecker(password));
    if (strength == "weak") {
      console.log(1);
      setPassIsWeak(true);
    } else {
      console.log(2);
      setPassIsWeak(false);
    }
  };

  const signUpMeth = () => {
    lenxtApi
      .post("/auth/signup", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.message && res.data.message === "User Created") {
          setErrorMsg(null);
          console.log(res.data);
          setsignupSuccess(true);
          setDisableSignUp(true);
        }
        console.log(res.data);
        setSubmit(false);
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response &&
          err.response.data.errMsg === "User already exists"
        ) {
          setErrorMsg("User already exists please sign in");
          console.log(err.response);
          console.log("err: ", errorMsg);
          setErrMail(true);
        }
        setSubmit(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cnfPassword === password) {
      setErrorMsg(null);
      setErrMail(false);
      setSubmit(true);
      passCheck();
      setTimeout(() => {
        console.log(passIsWeak);
      }, 3000);
      setTimeout(() => {
        if (passIsWeak === false) {
          // signUpMeth();
          setSubmit(false);
          console.log(passIsWeak);
        } else {
          setSubmit(false);
          console.log(passIsWeak);
        }
      }, 4000);
    } else {
      setErrPswd(true);
    }
  };

  useEffect(() => {
    document.title = "Sign Up | Lenxt";
  }, []);

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
      <Grid
        container
        spacing={2}
        direction={flexDir}
        sx={{ minHeight: "100vh" }}
      >
        <Grid
          item
          md={6}
          sx={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: flexDir === "row" ? 10 : 2,
                marginBottom: flexDir === "row" ? 10 : 2,
              }}
            >
              <Typography component="h1" variant="h5">
                Welcome to{" "}
                <b
                  style={{ fontWeight: 600, color: theme.palette.primary.main }}
                >
                  LENXT
                </b>
              </Typography>
              <Typography component="h2" variant="h5">
                Create an Account
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
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errMail === true) {
                      setErrMail(false);
                    }
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
                    if (passIsWeak === true) {
                      setPassIsWeak(false);
                    }
                  }}
                  error={errPswd}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="cnfPassword"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  id="cnfPassword"
                  value={cnfPassword}
                  onChange={(e) => {
                    setCnfPassword(e.target.value);
                    if (errPswd === true) {
                      setErrPswd(false);
                    }
                    if (passIsWeak === true) {
                      setPassIsWeak(false);
                    }
                  }}
                  error={errPswd}
                />
                {errPswd ? (
                  <Alert severity="error">Both password should be same</Alert>
                ) : null}
                {errorMsg && errMail ? (
                  <Alert severity="error">{errorMsg}</Alert>
                ) : null}
                {!errorMsg && !errMail && !errPswd && signupSuccess ? (
                  <Alert severity="success">Registered Successfully!</Alert>
                ) : null}
                {passIsWeak !== false ? (
                  <Alert severity="error">
                    The password you have entered is weak please enter a strong
                    Password
                  </Alert>
                ) : null}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disableElevation
                  disabled={submit ? true : disableSignUp}
                  endIcon={submit ? null : <LockOpen />}
                >
                  {submit ? (
                    <CircularProgress size={25} color="inherit" />
                  ) : (
                    "Register"
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
                    <RLink to="/auth/signin">
                      <Link variant="body2">
                        {"Already have an account? Sign in"}
                      </Link>
                    </RLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
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
          <img src={signUpImg} style={{ width: "90%" }} alt={"Sign Up image"} />
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
