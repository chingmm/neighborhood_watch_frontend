import React from "react";
import Posting from "./Posting.js";

function Postings(props) {
  const { handleUpdate, postings, handleDelete } = props;
  return (
    <div>
      {postings.map((posting) => (
        <Posting
          key={posting.id}
          posting={posting}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}

export default Postings;
