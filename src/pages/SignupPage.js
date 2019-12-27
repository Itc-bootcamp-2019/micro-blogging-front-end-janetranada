import React, { useState } from 'react';
import firebase from '../lib/firestore';

const auth = firebase.auth();

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [invalidEmailMessage, setInvalidEmailMessage] = useState('');

    function handleSignUpSubmit(event) {
        event.preventDefault();
        setErrorMessage('');
        setInvalidEmailMessage('');
        let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailFromState = email;
        let passwordFromState = password;
        if (emailRegEx.test(email)) {            
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            createUser(emailFromState, passwordFromState);
        } else {
            setInvalidEmailMessage('Invalid email format');
        }
    }

    function createUser(emailFromState, passwordFromState) {
        auth.createUserWithEmailAndPassword(emailFromState, passwordFromState)
            .then(credential => credential.user)
            .then(credentialUser => credentialUser.uid)
            .catch(error => {
                setErrorMessage(error.message);
            })
    }

    return (
        <div className="page-container">
            <p className="page-header">Sign-up</p>
            <form autoComplete="off" onSubmit={handleSignUpSubmit}>
                <div className="auth-input-container">
                    <label className="page-subheader">Email</label>
                    {errorMessage !== "" && (<span className="warning-password">{errorMessage}</span>)}
                    {invalidEmailMessage !== "" && (<span className="warning-password">{invalidEmailMessage}</span>)}
                    <input
                        className="auth-input"
                        name="email"
                        type="email"
                        placeholder="Email"
                        spellCheck="false"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </div>
                <div className="auth-input-container">
                    <label className="page-subheader">Password</label>
                    {(password !== "" && password.length < 6) && (<span className="warning-password">Should be at least 6 characters</span>)}
                    <input
                        className="auth-input"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <div className="auth-input-container">
                    <label className="page-subheader">Confirm Password</label>
                    {(password !== "" && confirmPassword !== "" && password !== confirmPassword) && (<span className="warning-password">Not matched!</span>)}
                    <input
                        className="auth-input"
                        name="password"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="white-text my-button profile-page"
                    disabled={password === "" || confirmPassword === "" || (password !== "" && confirmPassword !== "" && password !== confirmPassword)}
                >
                    Sign up
                </button>
            </form>
        </div>
    )
}

export default SignupPage;