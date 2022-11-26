import React, { useState } from "react";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:4001/auth/login", {
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <h2>Login</h2>
      <div>
        <form onSubmit={onSubmit}>
          <div class="mb-3">
            <label for="Email" class="form-label">
              Email
            </label>
            <input
              id="Email"
              class="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">
              Password
            </label>
            <input
              id="password"
              class="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
