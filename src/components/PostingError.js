import React from 'react';

const PostingError = (props) => {
    const {exitPostingError, errorMsgFromServer} = props;

    return (
        <div className="post-error-wrapper">
            <div className="post-error-content">
                <p className="server-error-msg">
                    Well, this is embarassing... <br />
                    We encountered this error while posting your tweet:
                </p>
                <p className="server-error-msg red">
                    {errorMsgFromServer}
                </p>
                <button 
                    className="post-error-btn white-text" 
                    onClick={() => exitPostingError()}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default PostingError;