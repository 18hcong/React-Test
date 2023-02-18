//class components
// function components
import React from "react";
import DisplayInfo from "./DisplayInfo";
import UserInfo from "./UserInfo";

class MyComponent extends React.Component {
  //JSX
  render() {
    const myInfo = ["ab", "b", "c", "c"];
    return (
      <div>
        <UserInfo />
        <br /> <br />
        <DisplayInfo name="Pham Hoang Cong" age="18" />
        <hr />
        <DisplayInfo name={"Hai Mai"} age={24} myInfo={myInfo} />
      </div>
    );
  }
}

export default MyComponent;
