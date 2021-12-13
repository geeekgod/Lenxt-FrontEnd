import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DeskTopChat from "./Components/DeskTopChat";
import MobileChatComp from "./Components/MobileChatComp";
import NotFound from "./pages/404";
import AddNewContact from "./pages/AddNewContact";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home";
import MobileChat from "./pages/MobileChat";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ChatActionsProvider } from "./store/Actions/ChatActions";
import { AuthContenxt } from "./store/Context/AuthContext";
import { ChatContextProvider } from "./store/Context/ChatContext";
import { MobileContextProvider } from "./store/Context/MobileContext";
import { getWindowDimensions } from "./utils/getWidth";

const App = () => {
  const { uid, accessToken, userP } = useContext(AuthContenxt);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const mobileChecker = () => {
    if (getWindowDimensions() < 690) {
      return true;
    } else return false;
  };

  const [isMobile, setIsMobile] = useState(mobileChecker());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowDimensions]);

  useEffect(() => {
    if (windowDimensions < 690) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [windowDimensions]);

  if ((uid, accessToken, userP)) {
    if (isMobile) {
      return (
        <Router>
          <ChatContextProvider>
            <ChatActionsProvider>
              <MobileContextProvider>
                <Routes>
                  <Route exact path="/">
                    <Route index element={<MobileChat />} />
                    <Route path="/chat" element={<MobileChatComp />} />
                    <Route path="/add-contact" element={<AddNewContact />} />
                    <Route element={<NotFound />} />
                  </Route>
                </Routes>
              </MobileContextProvider>
            </ChatActionsProvider>
          </ChatContextProvider>
        </Router>
      );
    } else {
      return (
        <Router>
          <ChatContextProvider>
            <ChatActionsProvider>
              <Routes>
                <Route exact path="/">
                  <Route index element={<DeskTopChat />} />
                  <Route path="/add-contact" element={<AddNewContact />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </ChatActionsProvider>
          </ChatContextProvider>
        </Router>
      );
    }
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="auth">
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    );
  }
};

export default App;
