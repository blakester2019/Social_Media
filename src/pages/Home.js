import React from "react";
import FirebaseApp, { FindUsername, DetermineAdmin } from "../firebase/Firebase";
import { useUser } from "../hooks";
// Components
import Discussions from "./HomeComponents/Discussions";

// need to add suggested after querying is figured out
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