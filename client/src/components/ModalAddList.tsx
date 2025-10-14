import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useState, type ChangeEvent } from "react";

interface Props {
	onClose: () => void;
	onAdd: (title: string) => void;
}

export const ModalAddList = ({ onClose, onAdd }: Props) => {
	const [input, setInput] = useState("");
	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
		setInput(e.target.value);
	};
	return (
		<div className="px-3 py-2 bg-[#F1F2F4] rounded-xl flex flex-col gap-2 cursor-pointer">
			<input
				value={input}
				onChange={handleChangeInput}
				type="text"
				className="px-3 py-1 w-full rounded outline-none border hover:border-blue-500 focus:border-blue-500"
				placeholder="Enter list name…"
			/>
			<div className="flex gap-2 items-center ml-1">
				<button
					onClick={() => {
						onAdd(input);
						setInput("");
					}}
					className="px-2 py-1 rounded bg-blue-500 text-white"
				>
					Add list
				</button>
				<span
					onClick={() => {
						onClose();
						setInput("");
					}}
					className="cursor-pointer"
				>
					<CloseOutlinedIcon fontSize="small"></CloseOutlinedIcon>
				</span>
			</div>
		</div>
	);
};
