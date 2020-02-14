import React, { Component } from "react";
import "./App.css";
import Loading from "./Loading";


class App extends Component {
  state = {
    messages: [],
    value: ""
  };

  stream = new EventSource(`http://localhost:4000/stream`);

  componentDidMount() {
    this.stream.onmessage = event => {
      const parsed = JSON.parse(event.data);

      console.log("PARSED", parsed.type, parsed.payload);
      if (parsed.type === "MESSAGES") {
        this.setState({
          messages: parsed.payload
        });
      }
      if (parsed.type === "MESSAGE") {
        const messages = [parsed.payload, ...this.state.messages];
        this.setState({
          messages: messages
        });
      }
    };
  }

  onChange = e => {
    const { value } = e.target;
    this.setState({ value });
  };

  onSubmit = e => {
    e.preventDefault();
    
  };

  onClear = () => {
    this.setState({
      value: ""
    });
  };

  render() {
    console.log("state", this.state);

    if (!this.state.messages.length) return <Loading />;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.value}
            name="messages"
            onChange={this.onChange}
            type="text"
          />
          <button type="submit">SUBMIT</button>
          <button onClick={this.onClear}>CLEAR</button>
        </form>
        {this.state.messages.map(mess => {
          return <p>{mess.message} </p>;
        })}
      </div>
    );
  }
}

export default App;
