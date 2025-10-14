import ListIcon from "@mui/icons-material/List";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { logoutUser } from "../store/usersReducer";

export const SidebarDasboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	return (
		<div className="flex flex-col w-[240px] border-r bg-gray-100">
			<div className="px-4 pb-6 mt-10 border-b-2">
				<div className="text-[#212529BF] text-[12px] font-medium">
					YOUR WORKSPACES
				</div>
				<div
					onClick={() => navigate("board")}
					className="flex gap-1 items-center mt-3 cursor-pointer"
				>
					<ListIcon fontSize="small" className="text-[#0D6EFD]"></ListIcon>
					<div className="text-[14px] font-medium text-[#0D6EFD]">Boards</div>
				</div>
				<div
					onClick={() => navigate("starred-board")}
					className="flex gap-1 items-center mt-3 cursor-pointer"
				>
					<StarBorderIcon
						fontSize="small"
						className="text-[#0D6EFD]"
					></StarBorderIcon>
					<div className="text-[14px] font-medium text-[#0D6EFD]">
						Starred Boards
					</div>
				</div>
				<div
					onClick={() => navigate("close-board")}
					className="flex gap-1 items-center mt-3 cursor-pointer"
				>
					<CloseIcon fontSize="small" className="text-[#0D6EFD]"></CloseIcon>
					<div className="text-[14px] font-medium text-[#0D6EFD]">
						Close Boards
					</div>
				</div>
			</div>
			<div className="p-4">
				<div className="flex gap-2 items-center mt-3 cursor-pointer">
					<SettingsIcon
						fontSize="small"
						className="text-[#0D6EFD]"
					></SettingsIcon>
					<div className="text-[14px] text-[#0D6EFD] font-medium">Settings</div>
				</div>
				<div
					onClick={() => {
						dispatch(logoutUser());
						navigate("/login");
					}}
					className="flex gap-2 items-center mt-3 cursor-pointer"
				>
					<LogoutIcon fontSize="small" className="text-[#0D6EFD]"></LogoutIcon>
					<div className="text-[14px] text-[#0D6EFD] font-medium">Sign out</div>
				</div>
			</div>
		</div>
	);
};
