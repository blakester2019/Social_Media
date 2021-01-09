// IMPORTS
// react and firebase
import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore"
//components
import AdminForm from "../pages/HomeComponents/AdminForm";

// VARIABLES TO HANDLE FIREBASE AND FIRESTORE
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

// ADD USER TO USERS COLLECTION IN FIRESTORE
export async function AddUser(fname, lname, username, email) {
  const data = {
    first: fname,
    last: lname,
    username: username,
    email: email,
    type: "user"
  }

  await database.collection("users").doc(email).set(data);
};

// DISPLAY USERNAME INSTEAD OF EMAIL ON THE HOME PAGE
export function FindUsername(email) {
  const docRef = database.collection("users");
  const query = docRef.where("email", "==", email);

  const [name] = useCollectionData(query, {idField: 'id'});
  return (
    <div>
      {name && name.map(uname => <DisplayUsername key={uname.id} name={uname.username} />)}
    </div>
  )
}

function DisplayUsername(props) {
  return (
    <div>
      <h2>Hello, {props.name}</h2>
    </div>
  )
}

// SHOW SECTION FOR ADMINS
export function DetermineAdmin(email) {
  const docRef = database.collection("users");
  const query = docRef.where("email", "==", email);

  const [admin] = useCollectionData(query, {idField: 'id'});

  return (
    <div>
      {admin && admin.map(thisAdmin => <DisplayAdminSection key={thisAdmin.id} name={thisAdmin.type} />)}
    </div>
  )
}

function DisplayAdminSection(props) {
  if(props.name == "admin") {
    return (
      <AdminForm />
    );
  } else {
    return(<></>);
  }
}

export default FirebaseApp;