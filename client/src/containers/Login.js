import React from "react";
import BesideForm from "../components/BesideForm";
import "../styles/Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="LoginBody">
      <BesideForm />
      <form>
        <h1>Login</h1>
        <span class="inputSpan">
          <label for="email">E-mail</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
          ></input>
        </span>
        <span class="inputSpan">
          <label for="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
          ></input>
          <Link to="">I forgot my password</Link>
        </span>

        <span class="submitSpan">
          <Link to="/homepage">
            <input type="submit" value="Log In" />
          </Link>
          <Link to="/createaccount">Don't have an account? Click here!</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
