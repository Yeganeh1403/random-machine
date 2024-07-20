import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      author: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(response => response.json())
      .then(data => {
        const index = Math.floor(Math.random() * data.quotes.length); // Use the length of the quotes array
        this.setState({
          text: data.quotes[index].quote,
          author: data.quotes[index].author
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  componentDidMount() { // Use componentDidMount instead of componentWillMount
    this.handleClick();
  }

  render() {
    return (
      <div id="quote-box" className="centered-element">
        <div id="text">{this.state.text}</div>
        <div id="author">{this.state.author}</div>
        <button id="new-quote" onClick={this.handleClick}>New Quote</button>
        <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text="${encodeURIComponent(this.state.text)}" - ${encodeURIComponent(this.state.author)}`} target="_blank" rel="noopener noreferrer">Tweet</a>
      </div>
    );
  }
}

export default App;