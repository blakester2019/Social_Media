import React from "react";
import { GetDiscussions } from "../../firebase/Firebase";

// need to add suggested after querying is figured out
function Discussions() {
  return (
    <div>
      <h1>Recent Discussions</h1>
      {GetDiscussions()}
    </div>
  );
}

export default Discussions;