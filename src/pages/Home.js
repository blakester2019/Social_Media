import React from "react";
import FirebaseApp, { FindUsername, DetermineAdmin } from "../firebase/Firebase";
import { useUser } from "../hooks";
// Components
import Discussions from "./HomeComponents/Discussions";

// need to add suggested after querying is figured out
function Home() {
  const user = useUser();
  return (
    <div>
      <h1>Home</h1>
      {FindUsername(user?.email)}
      {DetermineAdmin(user?.email)}
      <Discussions />
      <button onClick={() => FirebaseApp.auth().signOut()}>signOut</button>
    </div>
  );
}

export default Home;