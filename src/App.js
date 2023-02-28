import "./App.scss";
import Header from "./components/Header/Header";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div>test link</div>
      <div>
        <button>
          <Link to="/admins">Press to Admin Page</Link>
        </button>
        <button>
          <Link to="/users">Press to User Page</Link>
        </button>
      </div>
    </div>
  );
};
export default App;
