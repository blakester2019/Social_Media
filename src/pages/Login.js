import React, { useCallback } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import FirebaseApp from "../firebase/Firebase";
import { useUser } from "../hooks";

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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
      <p>Dont have an account? <Link to="/signup">sign up</Link></p>
    </div>
  );
}

export default Login;