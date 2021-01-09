import React from "react";
import { GetDiscussions } from "../../firebase/Firebase";

function Discussions() {
  return (
    <div>
      <h1>Recent Discussions</h1>
      {GetDiscussions()}
    </div>
  );
}

export default Discussions;