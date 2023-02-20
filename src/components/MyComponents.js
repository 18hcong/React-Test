//class components
// function components
import React from "react";
import DisplayInfo from "./DisplayInfo";
import UserInfo from "./UserInfo";

class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "Hoang Cong", age: "24" },
      { id: 2, name: "John", age: "20" },
      { id: 3, name: "Van Hai", age: "28" },
  ]};

  //JSX
  render() {
    //DRY: don't repeat yourself...
    return (
      <div>
        <UserInfo />
        <br /> <br />
        <DisplayInfo listUsers={this.state.listUsers  } />
      </div>
    );
  }
}

export default MyComponent;
