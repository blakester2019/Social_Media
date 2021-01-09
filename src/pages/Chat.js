import React, { useCallback } from "react";
import { createNewDiscussion } from "../firebase/Firebase";

function DiscussionChat() {
  const handleNewMessage = useCallback(
    async event => {
      event.preventDefault();
      const { text } = event.target.elements;

      try {
        await createNewDiscussion(text.value);
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
    </div>
  );
}

export default DiscussionChat;