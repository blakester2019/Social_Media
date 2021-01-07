import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import FirebaseApp from "../firebase/Firebase";

function SignUp({ history }) {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;

      try {
        await FirebaseApp.auth().createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch(error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">log in here</Link></p>
    </div>
  );
}

export default SignUp;