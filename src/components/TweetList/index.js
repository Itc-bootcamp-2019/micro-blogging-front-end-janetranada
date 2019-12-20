import React from 'react';
import MyAppContext from '../../contexts/MyAppContext';
import "./styles.css";

const TweetList = () => {
    return (
        <div className="tweets-container">
            <MyAppContext.Consumer>
                {({ tweets, addTweet, isPostingTweet }) => (
                    tweets.map((tweet, index) =>
                        <div key={tweet.userName + tweet.date} className="tweet-item-container">
                            <div className='tweet-info'>
                                <div className='tweet-info-username'>{tweet.userName}</div>
                                <div className='tweet-info-date'>{tweet.date}</div>
                            </div>
                            <div className="tweet-content-post">{tweet.content}</div>
                        </div>
                    )
                )}
            </MyAppContext.Consumer>
        </div>
    );
};

export default TweetList;