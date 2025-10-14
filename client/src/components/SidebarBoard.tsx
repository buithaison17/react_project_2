import ListIcon from "@mui/icons-material/List";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import type { Board, TypeBoard, User } from "../utils/type";

interface Props {
	currentUser: User;
	type: TypeBoard;
}

export const SidebarBoard = ({ currentUser, type }: Props) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const handleNavigate = (board: Board): void => {
		switch (board.type) {
			case "normal":
				navigate(`/board/${board.id}`);
				return;
			case "starred":
				navigate(`/starred-board/${board.id}`);
				return;
			case "close":
				navigate(`/close-board/${board.id}`);
				return;
		}
	};
	return (
		<div className="flex flex-col w-[240px] border-r bg-gray-100">
			<div className="px-4 pb-6 mt-8 border-b-2">
				<div className="text-[#212529BF] text-[12px] font-medium">
					YOUR WORKSPACES
				</div>
				<div
					onClick={() => navigate("/board")}
					className="flex gap-1 items-center mt-3 cursor-pointer"
				>
					<ListIcon fontSize="small" className="text-[#0D6EFD]"></ListIcon>
					<div className="text-[14px] font-medium text-[#0D6EFD]">Boards</div>
				</div>
				<div
					onClick={() => navigate("/starred-board")}
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
					onClick={() => navigate("/close-board")}
					className="flex gap-1 items-center mt-3 cursor-pointer"
				>
					<CloseIcon fontSize="small" className="text-[#0D6EFD]"></CloseIcon>
					<div className="text-[14px] font-medium text-[#0D6EFD]">
						Close Boards
					</div>
				</div>
			</div>
			<div className=" py-3 flex flex-col gap-1">
				<div className="flex justify-between items-center px-3">
					<div className="text-[14px] font-semibold text-[#172B4D]">
						Your Boards
					</div>
					<div className="cursor-pointer">
						<AddIcon fontSize="small"></AddIcon>
					</div>
				</div>
				<div className="mt-2 flex flex-col gap-2">
					{currentUser?.boards
						.filter((board) => board.type === type)
						.map((board) => (
							<div
								onClick={() => handleNavigate(board)}
								key={board.id}
								className={`flex gap-2 items-center p-2 cursor-pointer rounded-sm ${
									board.id === id ? "bg-gray-300" : ""
								}`}
							>
								<img
									src={board.backdrop}
									className="w-[24px] h-[24px] rounded object-cover object-center"
									alt=""
								/>
								<div className="w-[100px] truncate text-[14px] text-[#172B4D]">
									{board.title}
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};
