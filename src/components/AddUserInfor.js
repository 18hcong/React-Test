import React from "react";

class AddUserInfor extends React.Component {
  state = {
    name: "",
    address: "Dak Lak",
    age: "",
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

    this.props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: this.state.name,
      age: this.state.age,
    });
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

export default AddUserInfor;
