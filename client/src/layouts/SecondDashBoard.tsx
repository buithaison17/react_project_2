import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { CardDasboard } from "../components/CardDasboard";
import { useOutletContext, useParams } from "react-router-dom";
import type { User } from "../utils/type";

interface DashboardContextType {
	currentUser: User;
	handleOpenCreateBoard: () => void;
	handleOpenDeleteBoard: () => void;
	handleEditBoard: () => void;
	handleNavigate: () => void;
}

export const SecondDashbaord = () => {
	const {
		currentUser,
		handleOpenDeleteBoard,
		handleEditBoard,
		handleNavigate,
	} = useOutletContext<DashboardContextType>();
	const { type } = useParams();
	const getTitle = (): string => {
		switch (type) {
			case "board":
				return "Your Boards";
			case "starred-board":
				return "Starred Boards";
			case "close-board":
				return "Close Boards";
			default:
				return "";
		}
	};
	return (
		<div className="flex-1 px-6 py-4">
			<div>
				<div className="flex justify-between pb-4 border-b">
					<div className="flex gap-2 items-center">
						<FormatListBulletedOutlinedIcon fontSize="large"></FormatListBulletedOutlinedIcon>
						<div className="text-[31.25px] font-medium text-[#212529]">
							{getTitle()}
						</div>
					</div>
					<div className="flex items-center">
						<div className="px-2 py-1 text-[#6C757D] text-[14px] border rounded cursor-pointer">
							Share
						</div>
						<div className="px-2 py-1 text-[#6C757D] text-[14px] border rounded cursor-pointer">
							Export
						</div>
						<div className="ml-2 px-2 py-1 text-[#6C757D] text-[14px] border rounded">
							This week
						</div>
					</div>
				</div>
				<div className="grid grid-cols-4 gap-4 mt-3">
					{type === "board" &&
						currentUser?.boards.map((board) => (
							<CardDasboard
								key={board.id}
								board={board}
								handleDelete={handleOpenDeleteBoard}
								handleEdit={handleEditBoard}
								onClick={handleNavigate}
							></CardDasboard>
						))}
					{type == "starred-board" &&
						currentUser?.boards
							.filter((board) => board.type === "starred")
							.map((board) => (
								<CardDasboard
									key={board.id}
									board={board}
									handleDelete={handleOpenDeleteBoard}
									handleEdit={handleEditBoard}
									onClick={handleNavigate}
								></CardDasboard>
							))}
					{type === "close-board" &&
						currentUser?.boards
							.filter((board) => board.type === "close")
							.map((board) => (
								<CardDasboard
									key={board.id}
									board={board}
									handleDelete={handleOpenDeleteBoard}
									handleEdit={handleEditBoard}
									onClick={handleNavigate}
								></CardDasboard>
							))}
				</div>
			</div>
		</div>
	);
};
