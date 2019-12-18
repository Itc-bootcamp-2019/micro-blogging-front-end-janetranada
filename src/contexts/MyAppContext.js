import React from 'react';

const MyAppContext = React.createContext({
    tweets: [],
    addTweet: (tweet) => { },
    isPostingTweet: ''
});

export default MyAppContext;