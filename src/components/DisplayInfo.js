import React from "react";

class DisplayInfo extends React.Component {
  state = {
    isShowListUser: true,
  };

  handleShowHide = () => {
    this.setState({ isShowListUser: !this.state.isShowListUser });
  };
  render() {
    //destructuring array/object
    const { listUsers } = this.props; //object
    // console.log(listUsers);
    //props =>  VIẾT TẮT properties
    return (
      <div>
        {listUsers.map((item, index) => {
          return (
            <div>
              <div>
                <span
                  onClick={() => {
                    this.handleShowHide();
                  }}
                >
                  {this.state.isShowListUser === true
                    ? "Hide list User: "
                    : "Show list User: "}
                </span>
              </div>
              {this.state.isShowListUser && (
                <div key={item.id} className={+item.age > 23 ? "red" : "blue"}>
                  <div>My Name's: {item.name} </div>
                  <div>My Age's: {item.age}</div>
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
