import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import CreateTweet from './components/CreateTweet';
import MyAppContext from './contexts/MyAppContext';
import TweetList from './components/TweetList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: this.getFromLocalStorage(), //render all stored tweets upon loading
      addTweet: this.handleOnSubmit.bind(this)
    };
  }

  handleOnSubmit(tweet) {
    const { tweets } = this.state;
    console.log('tweets', tweets);
    let dateISO = (new Date()).toISOString();

    let tweetObj = { 
      content: tweet,
      userName: 'yonatan',
      date: dateISO
    };

    this.saveToLocalStorage(tweetObj);
    let tweetList = this.getFromLocalStorage();
    this.setState(prevState => { 
      return {tweets: [tweetObj, ...prevState.tweets] }
    });
  }

  saveToLocalStorage(tweet) {
    const tweetsStored = JSON.parse(localStorage.getItem('tweetsStored')) || [];
    tweetsStored.push(tweet);
    tweetsStored.sort((a,b) => (a.date > b.date)? -1 : 1);
    localStorage.setItem("tweetsStored", JSON.stringify(tweetsStored));
  }

  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tweetsStored")) || [];
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
