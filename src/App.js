import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, decreaseCounter } from "./redux/action/counterAction";
import MyComponent from "./components/MyComponents";
import React from "react";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidebar-container"></div>
      </div>
      <div className="app-content"></div>
      <Outlet />
    </div>
  );
};
export default App;
