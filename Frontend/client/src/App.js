import React from "react";
import PostCereate from "./components/Post/PostCreate";
import PostList from "./components/Post/PostList";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <div className="container">
        <h1>To Do App</h1>

        <SignUp />
        <hr />
        <Login />
        <hr />
        <PostCereate />
        <hr />
        <PostList />
      </div>
    </>
  );
}

export default App;
