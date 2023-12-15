import React from "react";
import BesideForm from "../components/BesideForm";
import "../styles/Login.css";
import { Link } from "react-router-dom";

function CreateAccount() {
  return (
    <div className="LoginBody">
      <BesideForm />
      <form>
        <h1>Create Your Account</h1>
        <span class="inputSpan">
          <label for="name">Name</label>
          <input name="name" type="text" placeholder="Enter your name"></input>
        </span>

        <span class="inputSpan">
          <label for="email">E-mail</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
          ></input>
        </span>
        <span class="inputSpan">
          <label for="password">Passwordl</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
          ></input>
        </span>
        <span class="inputSpan">
          <label for="birth">Birth</label>
          <input name="birth" type="date"></input>
        </span>
        <span class="submitSpan">
          <Link to="/login">
            <input type="submit" value="Confirm" />
          </Link>
          <Link to="/login">Already have an account? Click here!</Link>
        </span>
      </form>
    </div>
  );
}

export default CreateAccount;
