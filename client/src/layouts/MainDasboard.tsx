import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import { CardCreateNewBoard } from "../components/CardCreateNewBoard";
import { CardDasboard } from "../components/CardDasboard";
import { useOutletContext } from "react-router-dom";
import type { User } from "../utils/type";

interface DashboardContextType {
	currentUser: User;
	handleOpenCreateBoard: () => void;
	handleOpenDeleteBoard: () => void;
	handleEditBoard: () => void;
	handleNavigate: () => void;
}

export const MainDasboard = () => {
	const {
		currentUser,
		handleOpenCreateBoard,
		handleOpenDeleteBoard,
		handleEditBoard,
		handleNavigate,
	} = useOutletContext<DashboardContextType>();
	return (
		<div className="flex-1 px-6 py-4">
			<div>
				<div className="flex justify-between pb-4 border-b">
					<div className="flex gap-2 items-center">
						<FormatListBulletedOutlinedIcon fontSize="large"></FormatListBulletedOutlinedIcon>
						<div className="text-[31.25px] font-medium text-[#212529]">
							Your Workspaces
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
				<div className="grid grid-cols-4 gap-4 mt-3 max-sm:grid-cols-2">
					{currentUser?.boards.map((board) => (
						<CardDasboard
							key={board.id}
							board={board}
							handleDelete={handleOpenDeleteBoard}
							handleEdit={handleEditBoard}
							onClick={handleNavigate}
						></CardDasboard>
					))}
					<CardCreateNewBoard
						onClick={handleOpenCreateBoard}
					></CardCreateNewBoard>
				</div>
			</div>
			<div className="mt-6">
				<div className="flex items-center gap-2 pb-4 border-b">
					<StarOutlineOutlinedIcon fontSize="large"></StarOutlineOutlinedIcon>
					<div className="text-[27px] text-[#212529] font-medium">
						Starred Boards
					</div>
				</div>
				<div className="grid grid-cols-4 gap-4 mt-3 max-sm:grid-cols-2">
					{currentUser?.boards
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
				</div>
			</div>
		</div>
	);
};
