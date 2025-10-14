import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Logo from "../assets/icons/trello-logo-full.png";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
	closeSidebarMobile: () => void;
}

export const SidebarDasboardMobile = ({ closeSidebarMobile }: Props) => {
	return (
		<div className="fixed inset-0 z-30 flex">
			{/* Overlay */}
			<div
				className="flex-1 bg-black bg-opacity-40"
				onClick={closeSidebarMobile}
			/>
			{/* Sidebar */}
			<div className="w-[240px] h-full bg-gray-100 border-l-2 border-gray-300 overflow-y-auto transform transition-transform duration-300 translate-x-0">
				<div className="flex flex-col gap-3 border-b-2 px-4 py-6 border-b-gray-300">
					{/* Close button */}
					<div
						className="flex justify-end cursor-pointer"
						onClick={closeSidebarMobile}
					>
						<CloseIcon />
					</div>
					<div className="py-2">
						<img src={Logo} className="w-[80px]" alt="Dashboard Logo" />
					</div>
					<div className="text-[12px]">YOUR WORKSPACES</div>
					<div className="flex gap-2 items-center cursor-pointer">
						<FormatListBulletedIcon
							className="text-blue-500"
							fontSize="small"
						/>
						<div className="text-blue-500 text-[14px]">Boards</div>
					</div>
					<div className="flex gap-2 items-center cursor-pointer">
						<StarBorderIcon className="text-blue-500" fontSize="small" />
						<div className="text-blue-500 text-[14px]">Starred Boards</div>
					</div>
					<div className="flex gap-2 items-center cursor-pointer">
						<ClearOutlinedIcon className="text-blue-500" fontSize="small" />
						<div className="text-blue-500 text-[14px]">Closed Boards</div>
					</div>
				</div>
				<div className="flex flex-col gap-3 p-4">
					<div className="flex gap-2 items-center cursor-pointer">
						<SettingsIcon className="text-blue-500" fontSize="small" />
						<div className="text-blue-500 text-[14px]">Setting</div>
					</div>
					<div className="flex gap-2 items-center cursor-pointer">
						<ExitToAppIcon className="text-blue-500" fontSize="small" />
						<div className="text-blue-500 text-[14px]">Sign Out</div>
					</div>
				</div>
			</div>
		</div>
	);
};
