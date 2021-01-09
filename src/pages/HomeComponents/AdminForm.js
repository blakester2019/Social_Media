import React, { useCallback } from "react";
import { createNewDiscussion } from "../../firebase/Firebase";

function AdminForm() {
  const handleNewDiscussion = useCallback(
    async event => {
      event.preventDefault();
      const { title } = event.target.elements;

      try {
        await createNewDiscussion(title.value);
        title.value = "";
      } catch(error) {
        alert(error);
      }
    },
    []
  );

  return (
    <div>
      <h2>Create New Discussion</h2>
      <form onSubmit={handleNewDiscussion}>
        <input name="title" type="text" placeholder="Title" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default AdminForm;