import React from "react";
import Postings from "./Postings.js";

function Main(props) {
  console.log(props);
  const { handleUpdate, handleDelete, postings } = props;
  return (
    <main>
      <Postings
        postings={postings}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </main>
  );
}

export default Main;
