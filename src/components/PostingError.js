import React from 'react';

const PostingError = (props) => {
    const {exitPostingError} = props;

    return (
        <div className="post-error-wrapper">
            <div className="post-error-content">
                <p>
                    Well, this is embarassing... <br />
                    We encountered an error while posting your tweet.
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