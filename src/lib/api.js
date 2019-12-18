import axios from 'axios';

export function getTweets() {
    return axios.get('https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet');
}

export function postTweet(tweetObj) {
    return axios.post('https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet', {tweet:tweetObj});
} 