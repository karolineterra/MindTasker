import React from "react";
import BesideForm from "../components/BesideForm";
import '../styles/Login.css';

function CreateAccount() {
    return (
        <div className="CreateAccountBody">
            <BesideForm/>
            <form>
                <h1>Create Your Account</h1>
                <label for="name">Name</label>
                <input name="name" type="text" placeholder="Enter your name"></input>
                <label for="email">E-mail</label>
                <input name="email" type="email" placeholder="Enter your email"></input>
                <label for="password">Passwordl</label>
                <input name="password" type="password" placeholder="Enter your password"></input>
                <label for="birth">Birth</label>
                <input name="birth" type="date"></input>
                <input type="submit" value="Confirm"/>
                <a href="#">Already have an account? Click here!</a>
            </form>
        </div>
    );
}

export default CreateAccount;