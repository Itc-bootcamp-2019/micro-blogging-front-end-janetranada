import React from 'react';

const User = () => {
    return(
        <div className="user-profile-container">
            <p className="profile-header">Profile</p>
            <p className="username-header">User Name</p>
            <input className="username-input" placeholder="Eve"></input>
            <button className="white-text my-button profile-page">Save</button>
        </div>
        
    )
}

export default User;