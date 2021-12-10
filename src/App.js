import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/404";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { AuthActionsProvider } from "./store/Actions/AuthActions";
import { AuthContenxtProvider } from "./store/Context/AuthContext";

const App = () => {
  return (
    <AuthContenxtProvider>
      <AuthActionsProvider>
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
      </AuthActionsProvider>
    </AuthContenxtProvider>
  );
};

export default App;
