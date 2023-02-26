//class components
// function components
import React from "react";
import DisplayInfo from "./DisplayInfo";
import AddUserInfor from "./AddUserInfor";

class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "Hoang Cong", age: "20" },
      { id: 2, name: "John", age: "24" },
      { id: 3, name: "Van Hai", age: "38" },
    ],
  };

  handleAddNewUser = (userObj) => {
    console.log(">>>CHECK DATA: ", userObj);
    this.setState({
      listUsers: [userObj, ...this.state.listUsers],
    });
  };
  handleDeleteUser = (userId) => {
    let listUsersClone = this.state.listUsers;
    listUsersClone = listUsersClone.filter((item) => item.id !== userId);
    this.setState({
      listUsers: listUsersClone,
    });
  };

  //JSX
  render() {
    //DRY: don't repeat yourself...
    return (
      <>
        <br />
        <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
        <br /> <br />
        <DisplayInfo
          listUsers={this.state.listUsers}
          handleDeleteUser={this.handleDeleteUser}
        />
      </>
    );
  }
}

export default MyComponent;
