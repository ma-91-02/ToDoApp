import React, { useState } from "react";
import axios from "axios";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:4001/auth/signup", {
        email: email,
        name: name,
        password: password,
    });
    setEmail("");
    setName("");
    setPassword("");
  };
  return (
    <div>
      <div>
        <h2>Sign up</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label for="InputEmail"className="form-label">Email</label>
            <input type="email" class="form-control" id="InputEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label for="name" class="form-label">Name</label>
            <input id="name" class="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label for= "password"class="form-label">Password</label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class="form-control"
              type="password"
            />
          </div>
          <button type="submit" class="btn btn-primary">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
