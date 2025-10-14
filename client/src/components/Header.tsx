import { useNavigate } from "react-router-dom";
import Logo from "../assets/icons/trello-logo-full.png";

export const Header = () => {
	const navigate = useNavigate();
	return (
		<div className="border-b shadow z-10">
			<div className="w-[240px] p-4 border-r">
				<img
					onClick={() => navigate("/dashboard")}
					src={Logo}
					className="w-[80px]"
					alt=""
				/>
			</div>
		</div>
	);
};
