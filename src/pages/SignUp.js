import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import FirebaseApp, { AddUser} from "../firebase/Firebase";

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
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input name="fname" type="text" placeholder="First Name" />
        <input name="lname" type="text" placeholder="Last Name" />
        <input name="username" type="text" placeholder="Username" />
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">log in here</Link></p>
    </div>
  );
}

export default SignUp;