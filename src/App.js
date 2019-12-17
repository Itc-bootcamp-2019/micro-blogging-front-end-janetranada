import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import CreateTweet from './components/CreateTweet';
import MyAppContext from './contexts/MyAppContext';
import TweetList from './components/TweetList';
import { getTweets, postTweet } from './lib/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      addTweet: this.handleOnSubmit.bind(this)
    };
  }

  handleOnSubmit(tweet) {
    let dateISO = (new Date()).toISOString();
    let tweetObj = {
      content: tweet,
      userName: 'Eve',
      date: dateISO
    };

    this.postTweetToServer(tweetObj);
    this.setState(prevState => {
      return { tweets: [tweetObj, ...prevState.tweets] }
    });
  }

  componentDidMount() {
    getTweets().then(response => {
      this.setState({ tweets: response.data.tweets });
    })
  }

  getTweetsFromServer = () => {
    getTweets().then(response => {
      return response.data.tweets;
    });
  }

  postTweetToServer = (tweet) => {
    postTweet(tweet)
      .then(response => console.log(response))
      .catch(error => {
        console.log(error.response)
      });
  }

  render() {
    return (
      <div className="App">

        <Navbar />
        <MyAppContext.Provider value={this.state}>
          <CreateTweet />
          <TweetList />
        </MyAppContext.Provider>

      </div>
    );
  }
}

export default App;