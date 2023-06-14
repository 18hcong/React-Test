import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import Admin from "./components/Admin/Admin";
import Dashboard from "./components/Admin/Content/Dashboard";
import ManagementUser from "./components/Admin/Content/ManagementUser";
import Questions from "./components/Admin/Content/Question/Questions";
import ManagementQuiz from "./components/Admin/Content/Quiz/ManagementQuiz";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import HomePage from "./components/Home/HomePage";
import DetailQuiz from "./components/User/DetailQuiz";
import ListQuiz from "./components/User/ListQuiz";

const NotFound = () => {
	return (
		<div className="container p-4 my-5 bg-dark text-white">
			404. Not Found Data With Your Current URL...
		</div>
	);
};
const Layout = (props) => {
	return (
		<>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<HomePage />} />
					<Route path="users" element={<ListQuiz />} />
				</Route>
				<Route path="/quiz/:id" element={<DetailQuiz />} />
				<Route path="/admins" element={<Admin />}>
					<Route index element={<Dashboard />} />
					<Route path="manager-users" element={<ManagementUser />} />
					<Route path="manager-quizzes" element={<ManagementQuiz />} />
					<Route path="manager-questions" element={<Questions />} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="*" element={<NotFound />} />
			</Routes>

			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</>
	);
};

export default Layout;
