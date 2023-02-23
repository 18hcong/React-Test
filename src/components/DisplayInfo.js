import React from "react";
import "./DisplayInfo.scss";
import logo from "./../logo.svg";

class DisplayInfo extends React.Component {
  state = {
    isShowListUser: true,
  };

  handleShowHide = () => {
    this.setState({
      isShowListUser: !this.state.isShowListUser,
    });
  };
  render() {
    //destructuring array/object
    const { listUsers } = this.props; //object
    // console.log(listUsers);
    //props =>  VIET TẮT properties
    return (
      <div>
        {listUsers.map((User, index) => {
          return (
            <div className="display-info-container">
              <img src={logo } />
              <div>
                <span
                  onClick={() => {
                    this.handleShowHide();
                  }}
                >
                  Hide list item:
                  {this.state.isShowListUser === true
                    ? "Hide list User"
                    : "Show list User"}
                </span>
              </div>
              {this.state.isShowListUser && (
                <div key={User.id} className={+User.age > 20 ? "blue" : "red"}>
                  <div>My Name's: {User.name} </div>
                  <div>My Age's: {User.age}</div>
                  <hr />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
export default DisplayInfo;
