import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DeskTopChat from "./components/DeskTopChat";
import NotFound from "./pages/404";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AppRouter from "./routes/AppRouter";
import { AuthActionsProvider } from "./store/Actions/AuthActions";
import {
  AuthContenxt,
  AuthContenxtProvider,
} from "./store/Context/AuthContext";

const App = () => {
  const { uid, accessToken, userP } = useContext(AuthContenxt);
  if ((uid, accessToken, userP)) {
    return (
      <Router>
        <Routes>
          <Route exact path="/">
            <Route index element={<DeskTopChat />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
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
