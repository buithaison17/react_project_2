import EditBoard from "../assets/icons/edit-board.png";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import type { Board } from "../utils/type";

interface Props {
	handleDelete: (idBoard: string) => void;
	handleEdit: (board: Board) => void;
	onClick: (board: Board) => void;
	board: Board;
}

export const CardDasboard = ({
	board,
	handleDelete,
	handleEdit,
	onClick,
}: Props) => {
	return (
		<div className="relative h-[130px] rounded overflow-hidden group">
			<img onClick={() => onClick(board)} src={board.backdrop} alt="" />
			<div className="absolute top-3 left-3 text-[18px] font-medium text-white">
				{board.title}
			</div>
			<div
				onClick={() => handleEdit(board)}
				className="absolute w-[168px] bottom-3 left-3 opacity-0 group-hover:opacity-100 flex items-center duration-300 gap-2 p-2 bg-[#2C3E5D] rounded cursor-pointer"
			>
				<img src={EditBoard} className="w-[16px] h-[16px]" alt="" />
				<div className="text-[14px] text-white font-medium">
					Edit this board
				</div>
			</div>
			<div
				onClick={() => handleDelete(board.id)}
				className="absolute bottom-5 right-3 cursor-pointer opacity-0 group-hover:opacity-100 duration-300"
			>
				<DeleteOutlinedIcon
					className="text-red-500"
					fontSize="medium"
				></DeleteOutlinedIcon>
			</div>
		</div>
	);
};
