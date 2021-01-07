import React from "react";
import FirebaseApp from "../firebase/Firebase";
import { useUser } from "../hooks";

function Home() {
  const user = useUser();
  return (
    <>
      <h1>Home</h1>
      <p>Hello there, {user?.email}</p>
      <button onClick={() => FirebaseApp.auth().signOut()}>signOut</button>
    </>
  );
}

export default Home;