import React from "react";
import BesideForm from "../components/BesideForm";
import '../styles/Login.css';

function Login() {
    return (
        <div className="LoginBody">
            <BesideForm/>
            <form>
                <h1>Login</h1>
                <label for="email">E-mail</label>
                <input name="email" type="email" placeholder="Enter your email"></input>
                <label for="password">Passwordl</label>
                <input name="password" type="password" placeholder="Enter your password"></input>
                <a href="#">I forgot my password</a>
                <input type="submit">Log in</input>
                <a href="#">Don't have an account? Click here!</a>
            </form>
        </div>
    );
}

export default Login;