import React from "react";

class DisplayInfo extends React.Component {
  render() {
    //destructuring array/object
    const { listUsers } = this.props; //object
    // console.log(listUsers);

    //props =>  VIẾT TẮT properties
    return (
      <div>
        {listUsers.map((item) => {
          return (  
            <div key={item.id}>
              <div>My Name's:  {item.name} </div>
              <div>My Age's:  {item.age}</div>
              <hr/><hr/>
            </div>
          );
        })}
        {/* <div>My Name's: {name}</div>
        <div>My Age's: {age} </div>
        <hr /> <hr />
        <div>My Name's: {name}</div>
        <div>My Age's: {age} </div>
        <hr /> <hr />
        <div>My Name's: {name}</div>
        <div>My Age's: {age} </div> */}
      </div>
    );
  }
}
export default DisplayInfo;
