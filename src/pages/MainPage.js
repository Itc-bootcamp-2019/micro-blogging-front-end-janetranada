import React from 'react';
import loadingIcon from '../images/loading-icon.jpg';
import '../App.css';
import CreateTweet from '../components/CreateTweet/index';
import MyAppContext from '../contexts/MyAppContext';
import TweetList from '../components/TweetList/index';
import ServerError from '../components/ServerError/index';
import firebase from '../lib/firestore';

const db = firebase.firestore();

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      tweets: [],
      addTweet: this.handleOnSubmit.bind(this),
      isPostingTweet: false,
      loadingTweets: true,
      serverFailure: false,
      serverErrorMsg: ''
    };
  }

  componentDidMount() {
    this.getTweetsFromServer();
    this.interval = setInterval(this.getTweetsFromServer, 6000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleOnSubmit(tweet) {
    let currentUserName = JSON.parse(localStorage.getItem('usernameStored')) || ["Eve"];
    let dateISO = (new Date()).toISOString();
    let tweetObj = {
      content: tweet,
      userName: currentUserName.toString(),
      date: dateISO
    };
    this.postTweetToServer(tweetObj);
  }

  getTweetsFromServer = () => {
    let dbTweets = [];
    db.collection("tweets").orderBy('date', 'desc').get()
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          dbTweets.push(doc.data())
        });
        this.setState({
          tweets: dbTweets,
          loadingTweets: false
        });
      })
      .catch(error => {
        this.handleServerError(error);
      })
  }

  postTweetToServer = (tweetObj) => {
    this.setState({ isPostingTweet: true })
    db.collection("tweets").add(tweetObj)
      .then(() => {
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
      <div className="main-page">

        {serverFailure && <ServerError errorMsgFromServer={serverErrorMsg} exitServerError={this.exitServerError} />}
        <MyAppContext.Provider value={this.state}>
          <CreateTweet />
          {loadingTweets &&
            (
              <div>
                <h1>Loading...</h1>
                <img className="loading-img" src={loadingIcon} alt="loading-icon" />
              </div>
            )
          }
          {!loadingTweets && <TweetList />}
        </MyAppContext.Provider>

      </div>
    );
  }
}

export default MainPage;