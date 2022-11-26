import React, { useState } from "react";
import axios from "axios";
const PostCreate = () => {
  const [title, setTitle] = useState("");

  // I used here token just for test
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtZWRAdGVzdC5jb20iLCJ1c2VySWQiOiI2MzdkNjIzZTdiZTA0NWNkZDhmNmMwNWYiLCJpYXQiOjE2Njk0NzMyOTYsImV4cCI6MTY2OTQ3Njg5Nn0.10DLMP_hESVQnYbYBTD2xLK3m_o_xi42p1bYt5CCRTU";

  const onSubmit = (event) => {
    event.preventDefault();

    axios.post(
      "http://localhost:4001/posts",
      {
        title: title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTitle("");
  };
  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={onSubmit}>
        <div class="mb-3">
          <label for="title" class="form-label">
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            style={{ margin: "10px" }}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
