import React from 'react';

class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: 'Eve'
        }
    }

    render() {
        const { user } = this.state;
        return (
            <div className="user-profile-container">
                <p className="profile-header">Profile</p>
                <p className="username-header">User Name</p>
                <input 
                    className="username-input" 
                    placeholder="Please enter a username"
                    value={user}
                    onChange={event => this.setState({ user: event.target.value })}
                />                   
                
                <button 
                    className="white-text my-button profile-page"
                    onClick={() => {}}
                    disabled={user.length === 0}
                >
                    Save
                </button>
            </div>

        )
    }

}

export default User;