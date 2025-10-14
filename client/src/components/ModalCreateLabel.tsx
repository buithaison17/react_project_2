import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import type { Tag } from "../utils/type";

const colorRow: string[] = [
	"#BAF3DB",
	"#F8E6A0",
	"#FEDEC8",
	"#FFD5D2",
	"#DFD8FD",
	"#4BCE97",
	"#F5CD47",
	"#FEA362",
	"#F87168",
	"#9F8FEF",
];

interface Props {
	onPrev: () => void;
	onClose: () => void;
	onSubmit: (title: string, color: string) => void;
	isEdit?: Tag;
}

export const ModalCreateLabel = ({
	onClose,
	onPrev,
	onSubmit,
	isEdit,
}: Props) => {
	const [input, setInput] = useState("");
	const [colorChoose, setColorChoose] = useState("");
	useEffect(() => {
		if (isEdit) {
			setInput(isEdit.content);
			setColorChoose(isEdit.color);
		}
	}, [isEdit]);
	return (
		<div className="fixed inset-0 flex justify-center items-center z-10">
			<div
				onClick={() => {
					onPrev();
					setInput("");
					setInput("");
				}}
				className="fixed inset-0 bg-black/30"
			></div>
			<div className="w-[300px] bg-white p-4 z-20 rounded-lg">
				<div className="flex justify-between items-center">
					<span
						onClick={() => {
							onPrev();
							setInput("");
							setInput("");
						}}
						className="cursor-pointer"
					>
						<ArrowBackIosNewIcon fontSize="small"></ArrowBackIosNewIcon>
					</span>
					<div className="text-[14px] font-semibold text-[#44546F]">
						{isEdit ? "Edit label" : "Create label"}
					</div>
					<span
						onClick={() => {
							onClose();
							setInput("");
							setColorChoose("");
						}}
						className="cursor-pointer"
					>
						<CloseIcon fontSize="small"></CloseIcon>
					</span>
				</div>
				<div className="mt-5">
					<div className="flex flex-col gap-2">
						<div className="text-[12px] font-semibold text-[#44546F]">
							Title
						</div>
						<input
							onChange={(e) => setInput(e.target.value)}
							value={input}
							type="text"
							className="border rounded outline-none px-3 py-2 hover:border-blue-500 focus:border-blue-500"
						/>
					</div>
					<div className="mt-3 flex flex-col gap-3 border-b-2 pb-5">
						<div className="text-[12px] font-semibold text-[#44546F]">
							Select a color
						</div>
						<div className="grid grid-cols-5 gap-2">
							{colorRow.map((color) => (
								<div
									onClick={() => setColorChoose(color)}
									key={color}
									style={{ backgroundColor: color }}
									className={`h-[32px] rounded hover:border-2 hover:border-blue-500 duration-200 ${
										color === colorChoose ? "border-2 border-blue-500" : ""
									}`}
								></div>
							))}
						</div>
					</div>
					<button
						onClick={() => {
							onSubmit(input, colorChoose);
						}}
						className="mt-4 px-2 py-1 rounded bg-blue-500 text-white"
					>
						{isEdit ? "Save" : "Create"}
					</button>
				</div>
			</div>
		</div>
	);
};
