import { useState } from "react";
import { FaBars } from "react-icons/fa";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Outlet } from "react-router-dom";
import "./Admin.scss";
import SideBar from "./Sidebar";

const Admin = (props) => {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<div className="admin-container">
			<div className="admin-sidebar">
				<SideBar collapsed={collapsed} />
			</div>
			<div className="admin-content">
				<div className="admin-header">
					<FaBars onClick={() => setCollapsed(!collapsed)} />
				</div>
				<div className="admin-main">
					<PerfectScrollbar>
						<Outlet />
					</PerfectScrollbar>
				</div>
			</div>
		</div>
	);
};
export default Admin;
