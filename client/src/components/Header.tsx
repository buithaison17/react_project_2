import { useNavigate } from "react-router-dom";
import Logo from "../assets/icons/trello-logo-full.png";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
	openSidebarMobile?: () => void;
}

export const Header = ({ openSidebarMobile }: Props) => {
	const navigate = useNavigate();
	return (
		<div className="border-b shadow z-10 flex justify-between items-center">
			<div className="w-[240px] p-4 border-r">
				<img
					onClick={() => navigate("/dashboard")}
					src={Logo}
					className="w-[80px]"
					alt=""
				/>
			</div>
			<div className="px-5 hidden gap-5 items-center max-sm:flex">
				<span>
					<SearchIcon fontSize="small"></SearchIcon>
				</span>
				<span onClick={openSidebarMobile}>
					<MenuIcon fontSize="small"></MenuIcon>
				</span>
			</div>
		</div>
	);
};
