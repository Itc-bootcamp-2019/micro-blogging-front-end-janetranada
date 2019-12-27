import React from 'react';

function saveUsernameToLocalStorage (usernameInput) {
    let usernameStored = JSON.parse(localStorage.getItem('usernameStored')) || "Eve";
    usernameStored = usernameInput;
    localStorage.setItem("usernameStored", JSON.stringify(usernameStored));
}

class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userInput: JSON.parse(localStorage.getItem('usernameStored')) || "Eve"
        }
    }

    render() {
        const { userInput } = this.state;

        return (
            <div className="page-container">
                <p className="page-header">Profile</p>
                <p className="page-subheader">User Name</p>
                <input 
                    className="username-input" 
                    placeholder="Enter a username (whitespace not allowed)"
                    spellCheck='false'
                    value={userInput}
                    onChange={event => this.setState({ userInput: event.target.value.replace(" ", "")})}
                />                   
                
                <button 
                    className="white-text my-button profile-page"
                    onClick={() => saveUsernameToLocalStorage(userInput)}
                    disabled={userInput === ''}
                >
                    Save
                </button>
            </div>

        )
    }

}

export default User;