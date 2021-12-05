import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { LockOpen } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
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
import { passStrengthChecker } from "../../utils/passStrengthChecker";
import { getNumberLength } from "../../utils/getNumberLength";

const ForgotPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [otp, setOtp] = useState(0);
  const [disableReset, setDisableReset] = useState(false);
  const [errPswd, setErrPswd] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [errMail, setErrMail] = useState(false);
  const [passIsWeak, setPassIsWeak] = useState(false);
  const [stopSignUp, setStopSignUp] = useState(false);
  const [serverMsg, serServerMsg] = useState("");

  useEffect(() => {
    const cnfPssLen = cnfPassword.length;
    const pssLen = password.length;
    switch (serverMsg) {
      case "":
      case "user not present":
      case "user present":
        if (email !== "" && email !== " ") {
          if (email.indexOf("@") !== -1 && email.indexOf(".") !== -1) {
            setDisableReset(false);
          } else {
            setDisableReset(true);
          }
        } else {
          setDisableReset(true);
        }
        break;
      case "otp sent":
      case "otp not valid":
      case "otp not present":
        if (email !== "" && email !== " " && getNumberLength(otp) === 4) {
          if (email.indexOf("@") !== -1 && email.indexOf(".") !== -1) {
            setDisableReset(false);
          } else {
            setDisableReset(true);
          }
        } else {
          setDisableReset(true);
        }
        break;
      case "user not present":
        if (email !== "" && email !== " ") {
          if (email.indexOf("@") !== -1 && email.indexOf(".") !== -1) {
            setDisableReset(false);
          } else {
            setDisableReset(true);
          }
        } else {
          setDisableReset(true);
        }
        break;
      case "otp validated success":
      case "user not found":
        if (
          email !== "" &&
          email !== " " &&
          password !== "" &&
          password !== " " &&
          cnfPassword !== "" &&
          cnfPassword !== " " &&
          getNumberLength(otp) === 4
        ) {
          if (
            pssLen > 7 &&
            cnfPssLen > 7 &&
            email.indexOf("@") !== -1 &&
            email.indexOf(".") !== -1
          ) {
            passCheck();
            setDisableReset(false);
          } else {
            setDisableReset(true);
          }
        } else {
          setDisableReset(true);
        }
        break;
      default:
        if (email !== "" && email !== " ") {
          if (email.indexOf("@") !== -1 && email.indexOf(".") !== -1) {
            setDisableReset(false);
          } else {
            setDisableReset(true);
          }
        } else {
          setDisableReset(true);
        }
        break;
    }
  }, [email, password, cnfPassword, otp]);

  const passCheck = async () => {
    const strength = await passStrengthChecker(password);
    if (strength === "weak") {
      setPassIsWeak(true);
    } else {
      setPassIsWeak(false);
    }
  };

  const userCheckMeth = () => {
    lenxtApi
      .post("/reset-pass", {
        email: email,
      })
      .then((res) => {
        if (res.data.msg) {
          serServerMsg(res.data.msg);
          setDisableReset(true);
        }
        setSubmit(false);
      })
      .catch((err) => {
        console.log(err);
        setSubmit(false);
      });
  };

  const forgotPassMeth = () => {
    lenxtApi
      .post("/reset-pass/reset", {
        email: email,
        password: password,
        otp: otp,
      })
      .then((res) => {
        if (res.data.msg) {
          serServerMsg(res.data.msg);
          setDisableReset(true);
        }
        setSubmit(false);
      })
      .catch((err) => {
        console.log(err);
        setSubmit(false);
      });
  };

  const resetPasswordMeth = () => {
    if (cnfPassword === password) {
      setErrMail(false);
      setSubmit(true);
      passCheck().then(() => {
        if (passIsWeak) {
          setStopSignUp(true);
          setDisableReset(true);
        } else {
          setStopSignUp(false);
          setDisableReset(false);
        }
        switch (passIsWeak) {
          case true:
            setSubmit(false);
            break;
          case false:
            forgotPassMeth();
            break;
          default:
            setSubmit(false);
            break;
        }
      });
    } else {
      setErrPswd(true);
    }
  };

  const sendOtpMeth = () => {
    lenxtApi
      .post("/reset-pass/send-otp", {
        email: email,
      })
      .then((res) => {
        if (res.data.msg) {
          console.log(res.data.msg);
          serServerMsg(res.data.msg);
          setDisableReset(true);
        }
        setSubmit(false);
      })
      .catch((err) => {
        console.log(err);
        setSubmit(false);
      });
  };

  const validateOtp = () => {
    lenxtApi
      .post("/reset-pass/validate-otp", {
        email: email,
        otp: otp,
      })
      .then((res) => {
        if (res.data.msg) {
          serServerMsg(res.data.msg);
          setDisableReset(true);
        }
        setSubmit(false);
      })
      .catch((err) => {
        console.log(err);
        setSubmit(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (serverMsg) {
      case "":
      case "user not present":
      case "user not found":
        userCheckMeth();
        break;
      case "user present":
      case "otp not present":
        sendOtpMeth();
        break;
      case "otp sent":
      case "otp not valid":
        validateOtp();
        break;
      case "otp validated success":
        resetPasswordMeth();
        break;
      case "password reset successfull":
        setDisableReset(true);
        setSubmit(false);
        break;
      default:
        userCheckMeth();
        break;
    }
    console.log(serverMsg);
  };

  useEffect(() => {
    document.title = "Forgot Password | Lenxt";
  }, []);

  const renderFields = () => {
    switch (serverMsg) {
      case "":
      case "user not present":
      case "user not found":
      case "user present":
        return (
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
            }}
            error={errMail}
          />
        );
        break;
      case "otp not present":
      case "otp sent":
      case "otp not valid":
        return (
          <>
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
              }}
              error={errMail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="OTP"
              name="otp"
              autoComplete="otp"
              type="number"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                if (errMail === true) {
                  setErrMail(false);
                }
              }}
              error={errMail}
            />
          </>
        );
        break;
      case "otp validated success":
        return (
          <>
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
              }}
              error={errMail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="OTP"
              name="otp"
              autoComplete="otp"
              type="number"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
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
                if (stopSignUp === true) {
                  setStopSignUp(false);
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
                if (stopSignUp === true) {
                  setStopSignUp(false);
                }
              }}
              error={errPswd}
            />
          </>
        );
    }
  };

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
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Typography component="h4" variant="body1">
              Check your mail reset your password
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, padding: 1 }}
            >
              {renderFields()}
              {errPswd ? (
                <Alert severity="error">Both password should be same</Alert>
              ) : null}
              {passIsWeak !== false && stopSignUp ? (
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
                disabled={submit ? true : disableReset}
                // endIcon={submit ? null : <LockOpen />}
              >
                {submit ? (
                  <CircularProgress size={25} color="inherit" />
                ) : (
                  "Find User"
                )}
              </Button>
              {serverMsg === "otp validated success" ? (
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
              ) : null}
              <Grid container sx={{ paddingTop: 2 }}>
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
    </Box>
  );
};

export default ForgotPassword;
