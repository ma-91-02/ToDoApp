import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
const PostList = () => {
  const [posts, setPosts] = useState({});

  // I used here token just for test
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtZWRAdGVzdC5jb20iLCJ1c2VySWQiOiI2MzdkNjIzZTdiZTA0NWNkZDhmNmMwNWYiLCJpYXQiOjE2Njk0NzQ2OTMsImV4cCI6MTY2OTQ3ODI5M30.TQjvSH5WwmfpG8RTnX35ZMrJbsgVwnQfJJHL1E6Oj40";
  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4001/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPosts(res.data.posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // const DeleteHandler = async (postId) => {
  //   await axios.delete(`http://localhost:4001/post/${postId}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // };

  const renderedPost = Object.values(posts).map((post) => {
    return (
      <Post
        // key={post._id}
        // id={post._id}
        // author={post.creator.name}
        // date={new Date(post.createdAt).toLocaleDateString("en-US")}
        title={post.title}

        // onStartEdit={this.startEditPostHandler.bind(this, post._id)}
        // onDelete={this.deletePostHandler.bind(this, post._id)}
      />
    );
  });
  return (
    <div>
      <h1>Post List</h1>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPost}
      </div>
    </div>
  );
};

export default PostList;
