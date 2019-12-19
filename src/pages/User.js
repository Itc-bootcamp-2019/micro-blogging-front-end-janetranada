import React from 'react';

function saveUsernameToLocalStorage (usernameInput) {
    const usernameStored = JSON.parse(localStorage.getItem('usernameStored')) || ["Eve"];
    usernameStored.push(usernameInput);
    usernameStored.shift(usernameInput);
    localStorage.setItem("usernameStored", JSON.stringify(usernameStored));
}

class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userInput: JSON.parse(localStorage.getItem('usernameStored')) || ["Eve"]
        }
    }

    render() {
        const { userInput } = this.state;

        return (
            <div className="user-profile-container">
                <p className="profile-header">Profile</p>
                <p className="username-header">User Name</p>
                <input 
                    className="username-input" 
                    placeholder="Please enter a username"
                    value={userInput}
                    onChange={event => this.setState({ userInput: event.target.value })}
                />                   
                
                <button 
                    className="white-text my-button profile-page"
                    onClick={() => saveUsernameToLocalStorage(userInput)}
                    disabled={userInput.length === 0}
                >
                    Save
                </button>
            </div>

        )
    }

}

export default User;