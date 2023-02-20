import React from "react";

class UserInfo extends React.Component {
  state = {
    name: "Cong Hoangg",
    address: "Dak Lak",
    age: 23,
  };
  handleOnchangeAge = (event) => {
    this.setState({ age: event.target.value });
  };

  handleOnchangeInput = (event) => {
    this.setState({ name: event.target.value });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <div>
        My name is: {this.state.name} and address: {this.state.address} age:{" "}
        {this.state.age}
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <label>Your Name: </label>
          <input
            value={this.state.name}
            type="text"
            onChange={(event) => {
              this.handleOnchangeInput(event);
            }}
          />
          <label>Your Age: </label>
          <input
            value={this.state.age}
            type="text"
            onChange={(event) => {
              this.handleOnchangeAge(event);
            }}
          />
          <button> Submit </button>
        </form>
      </div>
    );
  }
}

export default UserInfo;
