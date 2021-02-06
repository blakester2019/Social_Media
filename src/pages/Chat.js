import React, { useCallback } from "react";
import { CreateNewMessage, GetMessages, AddOrRemoveLikes } from "../firebase/Firebase";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../hooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

/*
 GetLocation()
  - Returns the current path location used to find direstore document

  DiscussionChat()
  - Returns the chat for individual discussions
*/

function GetLocation() {
  const location = useLocation();
  const path = location.pathname;
  let doc = "";
  // Set i to 17 to only get path after /home/discussion/
  // I need a better way of doing this
  for (let i=17; i<path.length; i++) {
    doc = doc + path[i];
  }
  
  return doc;
}

function DiscussionChat() {
  let documentRef = GetLocation();
  let user = useUser();
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
    [documentRef]
  );

  return (
    <div className="chatPage">
      <div className="chatHeader">
        <div className="chatHeaderFlex">
          <h2>{documentRef}</h2>
          <button onClick={AddOrRemoveLikes(documentRef, user?.email)}><FontAwesomeIcon icon={faHeart} /></button>
          <Link to="/" style={{textDecoration: 'none'}}><p>Back To Home</p></Link>
        </div>
      </div>
      <div className="chatContainer">
        <div className="messagesContainer">
          {GetMessages(documentRef)}
        </div>
        <div className="formContainer">
          <form className="messageForm" onSubmit={handleNewMessage}>
            <input rows="2" name="text" type="text" placeholder="Begin typing your message" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DiscussionChat;