import React from "react";
import BesideForm from "../components/BesideForm";
import '../styles/Login.css';

function Login() {
    return (
        <div className="LoginBody">
            <BesideForm/>
            <form>
                <h1>Login</h1>
                <span class="inputSpan">
                    <label for="email">E-mail</label>
                <input name="email" type="email" placeholder="Enter your email"></input>
                </span>
                <span class="inputSpan">
                    <label for="password">Password</label>
                    <input name="password" type="password" placeholder="Enter your password"></input>
                    <a href="#">I forgot my password</a>
                </span>
                <span class="submitSpan">
                    <input type="submit" value="Log In"/>
                <a href="#">Don't have an account? Click here!</a>
                </span>
            </form>
        </div>
    );
}

export default Login;