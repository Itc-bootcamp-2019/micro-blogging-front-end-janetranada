import React,  {useState} from 'react';
import firebase from '../lib/firestore';

const auth = firebase.auth();

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then(cred => cred.user.uid)
            .catch(error => error.message)       
    }

    return (
        <div className="page-container">
            <p className="page-header">Log-in</p>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="auth-input-container">
                    <label className="page-subheader">Email</label>
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
                    <input 
                        className="auth-input" 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <button 
                    type="submit" 
                    className="white-text my-button profile-page"
                >
                    Log in
                </button>
            </form>
        </div>
    )
}

export default LoginPage;