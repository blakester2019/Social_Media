import React, { useCallback } from "react";
import { CreateNewMessage, GetMessages } from "../firebase/Firebase";
import { useLocation } from "react-router-dom";

function GetLocation() {
  const location = useLocation();
  const path = location.pathname;
  let doc = "";
  // Set i to 17 to only get path after /home/discussion/
  for (let i=17; i<path.length; i++) {
    doc = doc + path[i];
  }
  
  return doc;
}

function DiscussionChat() {
  let documentRef = GetLocation();
  const handleNewMessage = useCallback(
    async event => {
      event.preventDefault();
      const { text } = event.target.elements;

      try {
        await CreateNewMessage(documentRef, text.value);
        text.value = "";
      } catch(error) {
        alert(error);
      }
    },
    []
  );

  return (
    <div>
      <h2>Welcome to the chat</h2>
      <form onSubmit={handleNewMessage}>
        <input name="text" type="text" placeholder="Begin typing your message" />
        <button type="submit">Create</button>
      </form>
      {GetMessages(documentRef)}
    </div>
  );
}

export default DiscussionChat;