import { Routes, Route } from 'react-router-dom';
import App from './App';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import HomePage from './components/Home/HomePage';
import ManagementUser from './components/Admin/Content/ManagementUser';
import Dashboard from './components/Admin/Content/Dashboard';
import Login from './components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<User />} />
        </Route>
        <Route path="/admins" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="manager-users" element={<ManagementUser />} />
        </Route>
        <Route path="/login" element={<Login />} />
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