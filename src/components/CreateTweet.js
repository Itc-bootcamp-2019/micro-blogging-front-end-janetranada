import React from 'react'
import MyAppContext from '../contexts/MyAppContext';

class CreateTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweet: ''
        }
    }

    handleTweetChange(event) {
        this.setState({ tweet: event.target.value });
    }

    render() {
        const { tweet} = this.state;

        return (
            <MyAppContext.Consumer>
                {({tweets, addTweet}) => (
                    <div className="tweet-input-container">
                        <textarea 
                            id="tweet-user-input"
                            className="tweet-text-area white-text"
                            placeholder="What do you have in mind.."
                            onChange={(event) => this.handleTweetChange(event)}
                            value={this.state.tweet}
                        >                    
                        </textarea>

                        {(tweet.length > 140) && 
                            <div className="warning-length">
                                The tweet can't contain more than 140 chars.
                            </div>
                        }
                        
                        <button 
                            className="white-text my-button"
                            onClick={() => {
                                addTweet(tweet);
                                this.setState({tweet: '', btnDisabled: true});
                            }}
                            disabled = {tweet.length > 140 || tweet.length === 0}
                        >
                            Tweet
                        </button>
                        
                    </div>
                )}
            </MyAppContext.Consumer>
        )
    }
}

export default CreateTweet;