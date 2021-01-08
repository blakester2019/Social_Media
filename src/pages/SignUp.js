import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import FirebaseApp, { AddUser} from "../firebase/Firebase";
import homeImage from '../imgs/homeImage.jpg';

function SignUp({ history }) {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { fname, lname, email, username, password } = event.target.elements;

      try {
        await FirebaseApp.auth().createUserWithEmailAndPassword(email.value, password.value);
        AddUser(fname.value, lname.value, username.value, email.value)
        history.push("/");
      } catch(error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className="login-signup-container">
      <div className="header">
        <h1>StockTalk</h1>
        <Link to="/login" style={{ textDecoration: 'none' }}><p>Sign In</p></Link>
      </div>
      <div className="signUpContainer">
        <div className="signup-leftFlex">
          <h2>Get Started</h2>
          <h3>Create an account to use StockTalk</h3>
          <img src={homeImage} alt="Blakr Home"></img>
        </div>
        <div className="signup-rightFlex">
          <h4>Sign Up</h4>
          <form className="login-signup-form signup-form" onSubmit={handleSignUp}>
            <input name="fname" type="text" placeholder="First Name" />
            <input name="lname" type="text" placeholder="Last Name" />
            <input name="username" type="text" placeholder="Username" />
            <input name="email" type="email" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;