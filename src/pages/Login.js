import React, { useCallback } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import FirebaseApp from "../firebase/Firebase";
import { useUser } from "../hooks";
import homeImage from '../imgs/homeImage.jpg';

function Login({ history }) {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await FirebaseApp.auth().signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch(error) {
        alert(error);
      }
    },
    [history]
  );

  const currentUser = useUser();

  if(currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-signup-container">
      <div className="header">
        <h1>StockTalk</h1>
        <Link to="/signup" style={{ textDecoration: 'none' }}><p>Sign Up</p></Link>
      </div>
      <div className="flex-container">
        <div className="leftFlex">
          <h2>Welcome back,<br />log in to your account</h2>
          <form className="login-signup-form" onSubmit={handleLogin}>
            <input name="email" type="email" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            <button type="submit">Log In</button>
          </form>
        </div>
        <div className="rightFlex">
          <img src={homeImage} alt="Blakr Home"></img>
        </div>
      </div>
    </div>
  );
}

export default Login;