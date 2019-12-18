import React from 'react';
import loadingIcon from './images/loading-icon.jpg'
import './App.css';
import Navbar from './components/Navbar';
import CreateTweet from './components/CreateTweet';
import MyAppContext from './contexts/MyAppContext';
import TweetList from './components/TweetList';
import { getTweets, postTweet } from './lib/api';
import PostingError from './components/PostingError';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      addTweet: this.handleOnSubmit.bind(this),
      loadingTweets: true,
      failedPostingTweet: false,
      errorMsg: ''
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
    getTweets().then(response => {
      this.setState({ 
        tweets: response.data.tweets, 
        loadingTweets: false 
      });
    })
  }

  postTweetToServer = (tweetObj) => {
    postTweet(tweetObj)
      .then(response => {
        const { tweets } = this.state;
        this.setState({ tweets: [tweetObj, ...tweets] });
      })
      .catch(error => {
        this.setState({errorMsg: error.response.data});
        this.setState({failedPostingTweet: true})
      });
  }

  exitPostingError = () => {
    this.setState({failedPostingTweet: false});
  }

  render() {
    const {loadingTweets, failedPostingTweet, errorMsg} = this.state;
    return (
      <div className="App">

        <Navbar />  

        {failedPostingTweet && <PostingError errorMsgFromServer={errorMsg} exitPostingError={this.exitPostingError}/>}    

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