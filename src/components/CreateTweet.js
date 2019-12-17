import React from 'react'
import MyAppContext from '../contexts/MyAppContext';

class CreateTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweet: '',
            btnDisabled: true,
            moreThan140: false
        }
    }

    handleTweetChange(event) {
        this.setState({ tweet: event.target.value }, () =>{
            if (this.state.tweet.length <= 140 && this.state.tweet.length > 0) {                
                this.setState({btnDisabled: false, moreThan140: false});                              
            } else if (this.state.tweet.length > 140) {
                this.setState({btnDisabled: true, moreThan140: true});   
            } else {
                this.setState({btnDisabled: true, moreThan140: false});   
            }
        })
    }

    render() {
        const { tweet, moreThan140 } = this.state;

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

                        {moreThan140 && 
                            <div className="warning-length">
                                The tweet can't contain more than 140 chars.
                            </div>
                        }
                        
                        <button 
                            className="white-text my-button"
                            onClick={() => {
                                addTweet(tweet);
                                this.setState({tweet: ''});
                            }}
                            disabled = {this.state.btnDisabled}
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