import { DiReact } from "react-icons/di";
import { FaGem, FaMailchimp } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import {
	Menu,
	MenuItem,
	ProSidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link, useNavigate } from "react-router-dom";
import sidebarBg from "../../assets/bg2.jpg";

import "./Sidebar.scss";

const SideBar = (props) => {
	const navigate = useNavigate();
	const { image, collapsed, toggled, handleToggleSidebar } = props;
	return (
		<>
			<ProSidebar
				image={sidebarBg}
				collapsed={collapsed}
				toggled={toggled}
				breakPoint="md"
				onToggle={handleToggleSidebar}
			>
				<SidebarHeader>
					<div
						style={{
							padding: "24px",
							textTransform: "uppercase",
							fontWeight: "bold",
							fontSize: 15,
							letterSpacing: "1px",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
						}}
					>
						<DiReact size={"3em"} color={"00bfff"} />
						<span onClick={() => navigate("/")}>Cong Hoang Dev</span>
					</div>
				</SidebarHeader>

				<SidebarContent>
					<Menu iconShape="circle">
						<MenuItem
							icon={<MdDashboard />}
							//   suffix={<span className="badge red">new</span>}
						>
							Dashboard
							<Link to="/admins" />
						</MenuItem>
						{/* <MenuItem icon={<FaGem />}> components</MenuItem> */}
					</Menu>
					<Menu iconShape="circle">
						<SubMenu
							//   suffix={<span className="badge yellow">3</span>}
							//   icon={<FaRegLaughWink />}
							icon={<FaGem />}
							title="Features"
						>
							<MenuItem>
								User Management
								<Link to="/admins/manager-users " />
							</MenuItem>
							<MenuItem>
								Quiz management
								<Link to="/admins/manager-quizzes " />
							</MenuItem>
							<MenuItem>
								Question management
								<Link to="/admins/manager-questions " />
							</MenuItem>
						</SubMenu>
					</Menu>
				</SidebarContent>

				<SidebarFooter style={{ textAlign: "center" }}>
					<div
						className="sidebar-btn-wrapper"
						style={{
							padding: "20px 24px",
						}}
					>
						<a
							href="https://github.com/18hcong"
							target="_blank"
							className="sidebar-btn"
							rel="noopener noreferrer"
						>
							<FaMailchimp />

							<span
								style={{
									whiteSpace: "nowrap",
									textOverflow: "ellipsis",
									overflow: "hidden",
								}}
							>
								Cong Hoang dev
							</span>
						</a>
					</div>
				</SidebarFooter>
			</ProSidebar>
		</>
	);
};
export default SideBar;
