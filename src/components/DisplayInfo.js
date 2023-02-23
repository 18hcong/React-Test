import React from "react";
import "./DisplayInfo.scss";
import logo from "./../logo.svg";

class DisplayInfo extends React.Component {
  constructor(props){

    console.log(">> call Contructor: 1");
    super(props);
    //babel compiler
    this.state = {
      isShowListUser: true
  }
}
    componentDidMount() {
      console.log(">> call ComponentDidMount ");
      setTimeout(() => {
        document.title = 'Abc-xyz- Cong Hoang'
      }, 3000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      console.log(">> call ComponentDidUpdate: ", this.props, prevState);
      if(this.props.listUsers !== prevProps.listUsers){
        if(this.props.listUsers.length === 5){
          alert("Please, u got 5 users!");
        }
      }
    }

  handleShowHide = () => {
    this.setState({
      isShowListUser: !this.state.isShowListUser,
    });
  };
  render() {
    console.log('>>> call me render')
    //destructuring array/object
    const { listUsers } = this.props; //object
    // console.log(listUsers);
    //props =>  VIET TẮT properties
    return (
      <div>
        {listUsers.map((User, index) => {
          return (
            <div className="display-info-container">
              <img src={logo} />
              <div>
                <span
                  onClick={() => {this.handleShowHide()}}>Hide list item:{this.state.isShowListUser === true ? "Hide list User" : "Show list User"}
                </span>
              </div>
              {this.state.isShowListUser && (
                <>
                  {listUsers.map((user, index) => {
                    return (
                      <div key={User.id} className={+User.age > 20 ? "blue" : "red"}>
                        <div>My Name's: {User.name} </div>
                        <div>My Age's: {User.age}</div>
                      <div>
                        <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
                      </div>
                        <hr />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
export default DisplayInfo;
