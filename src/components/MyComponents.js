//class components
// function components
import React from "react";
import DisplayInfo from "./DisplayInfo";
import UserInfo from "./UserInfo";

class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "Hoang Cong", age: "20" },
      { id: 2, name: "John", age: "24" },
      { id: 3, name: "Van Hai", age: "38" },
    ],
  };

  //JSX
  render() {
    //DRY: don't repeat yourself...
    return (
      <div>
        <UserInfo />
        <br />
        <DisplayInfo listUsers={this.state.listUsers} />
      </div>
    );
  }
}

export default MyComponent;
