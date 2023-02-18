import React from "react";

class DisplayInfo extends React.Component {
  render() {
    //destructuring array/object
    const { name, age } = this.props;

    //props =>  VIẾT TẮT properties
    return (
      <div>
        <div>My Name's: {name}</div>
        <div>My Age's: {age} </div>
      </div>
    );
  }
}
export default DisplayInfo;
