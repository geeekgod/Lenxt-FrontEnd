import { Home } from "@mui/icons-material";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DeskTopChat from "../Components/DeskTopChat";
import NotFound from "../pages/404";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='auth'>
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
          </Route>
          <Route path='chat' element={<DeskTopChat />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
