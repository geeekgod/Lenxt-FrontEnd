import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const Home = () => {
  return(
    <div>
        <h1>Lenxt Landing</h1>
        <Link to="/auth/signin">Sign in</Link>
        <br/>
        <Link to="/auth/signup">Sign Up</Link>
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route
            index
            element={<Home/>}
          />
          <Route path="auth">
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
