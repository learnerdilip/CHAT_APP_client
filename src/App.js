import React, { Component } from "react";
import "./App.css";

class App extends Component {
  stream = new EventSource(`http://localhost:4000/stream`);

  componentDidMount() {
    this.stream.onmessage = event => {
      const parsed = JSON.parse(event.data);
      console.log("event", parsed, typeof parsed);
    };
  }

  render() {
    return <div className="App"> Hello</div>;
  }
}

export default App;
