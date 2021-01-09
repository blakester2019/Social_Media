import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore"

const FirebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyArNHh_ZAWXNFiomfYaE9TjHWutOaT3EsY",
  authDomain: "social-55f2e.firebaseapp.com",
  projectId: "social-55f2e",
  storageBucket: "social-55f2e.appspot.com",
  messagingSenderId: "288334994328",
  appId: "1:288334994328:web:353b8c6478ed45b258a9ed",
  measurementId: "G-30EZQ5XHCK"
});

const database = firebase.firestore();

export async function AddUser(fname, lname, username, email) {
  const data = {
    first: fname,
    last: lname,
    username: username,
    email: email
  }

  await database.collection("users").doc(email).set(data);
  console.log("New user created");
};

export function FindUsername(email) {
  const docRef = database.collection("users");
  const query = docRef.where("email", "==", email);

  const [name] = useCollectionData(query, {idField: 'id'});
  return (
    <div>
      {name && name.map(uname => <ChatMessage key={uname.id} username="hi" name={uname.username} />)}
    </div>
  )
}

function ChatMessage(props) {
  return (
    <>
      <div>
        <p>hello, {props.name}</p>
      </div>
    </>
  )
}

export default FirebaseApp;