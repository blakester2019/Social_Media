import React from "react";
import FirebaseApp, { FindUsername, DetermineAdmin } from "../firebase/Firebase";
import { useUser } from "../hooks";
// Components
import Discussions from "./HomeComponents/Discussions";

/*
 - Returns the home page once a user is logged in
 - Home page contains the links to all discussions
*/

function Home() {
  const user = useUser();
  return (
    <div className="homeContainer">
      <div className="homeHeader">
        <h1>Home</h1>
        {FindUsername(user?.email)}
        <button onClick={() => FirebaseApp.auth().signOut()}>Sign Out</button>
      </div>
      {DetermineAdmin(user?.email)}
      <Discussions />
    </div>
  );
}

export default Home;