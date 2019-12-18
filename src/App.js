import React from 'react';
import loadingIcon from './images/loading-icon.jpg'
import './App.css';
import Navbar from './components/Navbar';
import CreateTweet from './components/CreateTweet';
import MyAppContext from './contexts/MyAppContext';
import TweetList from './components/TweetList';
import { getTweets, postTweet } from './lib/api';
import ServerError from './components/ServerError';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      addTweet: this.handleOnSubmit.bind(this),
      isPostingTweet: false,
      loadingTweets: true,
      serverFailure: false,
      serverErrorMsg: ''
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
  }

  componentDidMount() {
    getTweets()
      .then(response => {
        this.setState({
          tweets: response.data.tweets,
          loadingTweets: false
        });
      })
      .catch(error => {
        this.handleServerError(error);
      })
  }

  postTweetToServer = (tweetObj) => {
    this.setState({ isPostingTweet: true })
    postTweet(tweetObj)
      .then(response => {
        const { tweets } = this.state;
        this.setState({ tweets: [tweetObj, ...tweets] }); 
        this.setState({ isPostingTweet: false });              
      })
      .catch(error => {
        this.handleServerError(error);
      });
  }

  handleServerError = (error) => {
    this.setState({ 
      serverErrorMsg: error.response.data, 
      serverFailure: true 
    });
  }

  exitServerError = () => {
    this.setState({ 
      serverFailure: false, 
      isPostingTweet: false 
    });    
  }

  render() {
    const { loadingTweets, serverFailure, serverErrorMsg } = this.state;
    return (
      <div className="App">

        <Navbar />

        {serverFailure && <ServerError errorMsgFromServer={serverErrorMsg} exitServerError={this.exitServerError} />}

        <MyAppContext.Provider value={this.state}>
          <CreateTweet />

          {loadingTweets &&
            (
              <div>
                <h1>Loading...</h1>
                <img className="loading-img" src={loadingIcon} />
              </div>
            )
          }

          {!loadingTweets && <TweetList />}
        </MyAppContext.Provider>

      </div>
    );
  }
}

export default App;