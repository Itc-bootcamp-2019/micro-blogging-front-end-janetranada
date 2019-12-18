import React from 'react'
import MyAppContext from '../contexts/MyAppContext';

const TweetList = () => {
    return (
        <div className="tweets-container">
            <MyAppContext.Consumer>
                {({ tweets, addTweet, isPostingTweet }) => (
                    tweets.map((tweet, index) =>
                        <div key={tweet.userName + tweet.date} className="tweet-item-container">
                            <div className='tweet-info'>
                                <div>{tweet.userName}</div>
                                <div>{tweet.date}</div>
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