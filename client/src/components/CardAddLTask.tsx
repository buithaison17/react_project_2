import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import React, { useState } from "react";

interface Props {
	onClose: () => void;
	onAdd: (title: string) => void;
}

export const CardAddTask = ({ onClose, onAdd }: Props) => {
	const [input, setInput] = useState("");
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setInput(e.target.value);
	};
	return (
		<div className="flex flex-col gap-2 mt-2">
			<input
				value={input}
				onChange={handleChangeInput}
				type="text"
				className="w-full h-[56px] p-3 rounded-lg border shadow outline-none text-[14px] hover:border-blue-500 focus:border-blue-500"
				placeholder="Enter a title or paste a link"
			/>
			<div className="flex gap-2 items-center">
				<button
					onClick={() => {
						onAdd(input);
						setInput("");
					}}
					className="px-2 py-1 rounded text-white bg-blue-500"
				>
					Add card
				</button>
				<div
					onClick={() => {
						onClose();
						setInput("");
					}}
					className="cursor-pointer"
				>
					<CloseOutlinedIcon fontSize="small"></CloseOutlinedIcon>
				</div>
			</div>
		</div>
	);
};
