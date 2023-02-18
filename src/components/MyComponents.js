//class components
// function components
import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Cong Hoangg",
    address: "Dak Lak",
    age: 23,
  };

  handleClick(event) {
    console.log("Clicking...");
    console.log("My name is: ", this.state.name);

    this.setState({
      name: "Hoang Cee",
      address: "Dak Lak",
      age: Math.floor(Math.random() * 100) + 1,
    });
  }

  handleOnMoverOver(event) {
    console.log("You hover me");
    // console.log(event);
  }
  handleOnchangeInput = (event) => {
    this.setState({ name: event.target.value });
  };
  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };
  //JSX
  render() {
    return (
      <div>
        My name is: {this.state.name} and address: {this.state.address} age:{" "}
        {this.state.age}
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <input
            type="text"
            onChange={(event) => {
              this.handleOnchangeInput(event);
            }}
          />
          <button> Submit </button>
        </form>
      </div>
    );
  }
}

export default MyComponent;
