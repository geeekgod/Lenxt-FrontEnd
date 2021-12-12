import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DeskTopChat from "./Components/DeskTopChat";
import NotFound from "./pages/404";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ChatActionsProvider } from "./store/Actions/ChatActions";
import { AuthContenxt } from "./store/Context/AuthContext";
import { ChatContextProvider } from "./store/Context/ChatContext";

const App = () => {
  const { uid, accessToken, userP } = useContext(AuthContenxt);
  if ((uid, accessToken, userP)) {
    return (
      <Router>
        <ChatContextProvider>
          <ChatActionsProvider>
            <Routes>
              <Route exact path="/">
                <Route index element={<DeskTopChat />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </ChatActionsProvider>
        </ChatContextProvider>
      </Router>
    );
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
