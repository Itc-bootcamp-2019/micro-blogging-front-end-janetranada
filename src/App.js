import React from 'react';
import loadingDots from './components/images/loadingDots.gif'
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
    this.setState({loading: true});
    let dateISO = (new Date()).toISOString();
    let tweetObj = {
      content: tweet,
      userName: 'Eve',
      date: dateISO
    };

    this.postTweetToServer(tweetObj);
    // this.setState(prevState => {
    //   return { tweets: [tweetObj, ...prevState.tweets] }
    // });
  }

  componentDidMount() {
    getTweets().then(response => {
      this.setState({ tweets: response.data.tweets, loading: false });
    })
  }

  getTweetsFromServer = () => {
    getTweets().then(response => {
      return response.data.tweets;
    });
  }

  postTweetToServer = (tweetObj) => {
    postTweet(tweetObj)
      .then(response => {
        console.log(response);
        this.setState(prevState => {
          return { tweets: [tweetObj, ...prevState.tweets] }
        });
        this.setState({loading: false});
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
          {/* {loading && <img className="loading-img" src={loadingDots} />} */}
          {loading && <h2>Loading..</h2>}
          {!loading && <TweetList />}
        </MyAppContext.Provider>

      </div>
    );
  }
}

export default App;