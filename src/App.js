import React from 'react';
import loadingIcon from './images/loading-icon.jpg'
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
      addTweet: this.handleOnSubmit.bind(this),
      loading: true
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
        loading: false 
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
        console.log(error.response);
      });
  }

  render() {
    const {loading} = this.state;
    return (
      <div className="App">

        <Navbar />
        <MyAppContext.Provider value={this.state}>
          <CreateTweet />
          {loading && 
            (
              <div>
                <h1>Loading...</h1>
                <img className="loading-img" src={loadingIcon} />
              </div>
            )
          }

          {!loading && <TweetList />}
        </MyAppContext.Provider>

      </div>
    );
  }
}

export default App;