import React from "react";
import FirebaseApp, { FindUsername } from "../firebase/Firebase";
import { useUser } from "../hooks";
// Components
import Suggested from "./HomeComponents/Suggested";

// need to add suggested after querying is figured out
function Home() {
  const user = useUser();
  return (
    <div>
      <h1>Home</h1>
      {FindUsername(user?.email)}
      <button onClick={() => FirebaseApp.auth().signOut()}>signOut</button>
    </div>
  );
}

export default Home;