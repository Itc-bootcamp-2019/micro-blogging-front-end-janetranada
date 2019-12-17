import React from 'react'
import MyAppContext from '../contexts/MyAppContext';


class CreateTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweet: '',
        }
    }

    handleTweetChange(event) {
        this.setState({ tweet: event.target.value })
    }

    render() {
        const { tweet } = this.state;

        return (
            <MyAppContext.Consumer>
                {({tweets, addTweet}) => (
                    <div className="tweet-input-container">
                        <textarea 
                            id="tweet-user-input"
                            className="tweet-text-area white-text"
                            placeholder="What do you have in mind.."
                            onChange={(event) => this.handleTweetChange(event)}
                        >                    
                        </textarea>
                        <button 
                            className="white-text my-button"
                            onClick={() => addTweet(tweet)}
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