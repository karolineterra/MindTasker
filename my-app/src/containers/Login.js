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
                <input name="email" type="text" placeholder="Enter your email"></input>
            </form>
        </div>
    );
}

export default Login;