// IMPORTS
// react and firebase
import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore"
import useUser from "../hooks/useUser";
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
const auth = firebase.auth();

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
    <h1 className="username">{props.name}</h1>
  )
}

// SHOW SECTION FOR ADMINS ONLY
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
  if(props.name === "admin") {
    return (
      <AdminForm />
    );
  } else {
    return(<></>);
  }
}

// CREATE NEW DISCUSSION
export function createNewDiscussion(title) {
  const date = new Date();
  const today = String(date.getMonth()+1) + "/" + String(date.getDate()) + "/" + String(date.getFullYear());
  
  database.collection("Discussions").doc(title).set({
    title: title,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  database.collection("Discussions").doc(title).collection("messages").doc("new").set({
    text: "New Discussion created: " + today,
    created: firebase.firestore.FieldValue.serverTimestamp(),
    userEmail: "System"
  });

  alert("Discussion Created");
}

// SHOW DISCUSSIONS
export function GetDiscussions() {
  const docRef = database.collection("Discussions");
  const query = docRef.orderBy('createdAt').limit(5);

  const [discussion] = useCollectionData(query);
  return (
    <div>
      {discussion && discussion.map(thread => <DisplayDiscussions key={thread} name={thread.title} />)}
    </div>
  )
}

function DisplayDiscussions(props) {
  const link = "/home/discussion/" + props.name;
  return (
    <div className="discussionElement" id={props.name}>
      <Link to={link} style={{ textDecoration: 'none' }}><h2>{props.name}</h2></Link>
    </div>
  )
}

// GET USERNAME FOR MESSAGES
function GetMessageUsername(email) {
  const docRef = database.collection("users");
  const query = docRef.where("email", "==", email);

  const [name] = useCollectionData(query);
  return (
    <div>
      {name && name.map(uname => <DisplayMessageUsername key={uname.id} name={uname.username} />)}
    </div>
  )
}

function DisplayMessageUsername(props) {
  return (
    <p>{props.name}</p>
  )
}


// CREATE NEW MESSAGE
export function CreateNewMessage(document, text) {
  const user = auth.currentUser;
  database.collection("Discussions").doc(document).collection("messages").add({
    text: text,
    created: firebase.firestore.FieldValue.serverTimestamp(),
    userEmail: user.email
  })
}

/* Discussion Chats */
export function GetMessages(document) {
  const messagesRef = database.collection("Discussions").doc(document).collection("messages");
  const query = messagesRef.orderBy('created').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  return (
    <div>
      {messages && messages.map(msg => <Message key={msg.id} message={msg} />)}
    </div>
  );
}

function Message(props) {
  const { text, userEmail } = props.message;
  const user = useUser();

  let messageClass = "";
  if (user?.email === userEmail) {
    messageClass = "sent";
  }  else {
    messageClass = "received";
  }

  return(
    <div className={`message ${messageClass}`}>
      <p>{GetMessageUsername(userEmail)}</p>
      <h5>{text}</h5>
    </div>
  );
}

/* LIKES */

export async function AddOrRemoveLikes(docRef, email) {
  const userRef = database.collection("Discussions").doc(docRef).collection("usersLiked").doc(email);
  const discussion = database.collection("Discussions").doc(docRef);
  const checkForDoc = await userRef.get();

  if (!checkForDoc.exists) {
    userRef.set({
      userEmail: email
    });
    discussion.update({
      likes: firebase.firestore.FieldValue.increment(1)
    })
  }
}

export default FirebaseApp;