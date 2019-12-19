import React from 'react';
import './styles.css';

const ServerError = (props) => {
    const {exitServerError, errorMsgFromServer} = props;

    return (
        <div className="post-error-wrapper">
            <div className="post-error-content">
                <p className="server-error-msg">
                    Well, this is embarassing... <br />
                    We encountered this error from the server:
                </p>
                <p className="server-error-msg red">
                    {errorMsgFromServer}
                </p>
                <button 
                    className="post-error-btn white-text" 
                    onClick={() => exitServerError()}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default ServerError;