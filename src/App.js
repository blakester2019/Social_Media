import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";
import { AuthProvider } from "./providers";
import PrivateRoute from "./routes/PrivateRoute";
import './App.css';

/*
 - Holds all the routes to the components in the pages folder
 - Private Routes require the user to be logged in before use
*/

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute path="/home/discussion" component={Chat} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
