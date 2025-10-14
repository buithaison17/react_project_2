import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import React, { useEffect, useState } from "react";
import Tick from "../assets/icons/logo-tick.png";
import type { Board } from "../utils/type";

interface ImageItem {
	image: string;
}

interface ColorItem {
	from: string;
	to: string;
}

const imageRow: ImageItem[] = [
	{
		image:
			"https://res.cloudinary.com/db4y1dgnp/image/upload/v1759378225/m2zskmrawqpvxnvsuetr.jpg",
	},
	{
		image:
			"https://res.cloudinary.com/db4y1dgnp/image/upload/v1759378161/jtoihhg4izrph1rcrlxq.jpg",
	},
	{
		image:
			"https://res.cloudinary.com/db4y1dgnp/image/upload/v1759378938/tv6klliekufan47mzmdy.jpg",
	},
	{
		image:
			"https://res.cloudinary.com/db4y1dgnp/image/upload/v1759378951/zgjhcdp7zqdubp5rrcfo.jpg",
	},
];

const ColorRow: ColorItem[] = [
	{
		from: "#FFB100",
		to: "#FA0C00",
	},
	{
		from: "#2609FF",
		to: "#D20CFF",
	},
	{
		from: "#00FF2F",
		to: "#00FFC8",
	},
	{
		from: "#00FFE5",
		to: "#004BFA",
	},
	{
		from: "#FFA200",
		to: "#EDFA00",
	},
	{
		from: "#FF00EA",
		to: "#FA0C00",
	},
];

interface Props {
	onClose: () => void;
	onSave: (title: string, image: string) => void;
	isEdit: Board | null;
}

export const ModalCreateNewBoard = ({ onClose, onSave, isEdit }: Props) => {
	const [input, setInput] = useState("");
	const [inputImage, setInputImage] = useState("");
	const [inputColor, setInputColor] = useState<{ from: string; to: string }>({
		from: "",
		to: "",
	});
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setInput(e.target.value);
	};
	const handleChooseImage = (image: string): void => {
		setInputImage(image);
	};
	const handleChooseColor = (color: { from: string; to: string }): void => {
		setInputColor({ ...inputColor, from: color.from, to: color.to });
	};
	useEffect(() => {
		if (isEdit) {
			setInput(isEdit.title);
			setInputImage(isEdit.backdrop);
		}
	}, [isEdit]);
	return (
		<div className="fixed inset-0 flex justify-center items-center z-20">
			<div onClick={onClose} className="fixed inset-0 bg-black/30"></div>
			<div className="w-[500px] bg-white rounded z-10 border">
				<div className="flex justify-between items-center p-3 border-b">
					<div className="text-[20px] text-[#212529] font-medium">
						{isEdit ? "Edit Board" : "Create Board"}
					</div>
					<div onClick={onClose} className="cursor-pointer">
						<CloseOutlinedIcon fontSize="small"></CloseOutlinedIcon>
					</div>
				</div>
				<div className="p-3 pb-5 border-b">
					<div className="flex flex-col gap-2">
						<div className="text-[20px] font-medium">Background</div>
						<div className="grid grid-cols-4 gap-2">
							{imageRow.map((item) => (
								<div
									key={item.image}
									onClick={() => handleChooseImage(item.image)}
									className="relative h-[60px] rounded overflow-hidden"
								>
									<img className="absolute inset-0" src={item.image}></img>
									{item.image === inputImage && (
										<img
											src={Tick}
											className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-[16px] h-[16px]"
										></img>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="p-3 pb-5 border-b mt-1">
					<div className="flex flex-col gap-2">
						<div className="text-[20px] font-medium">Color</div>
						<div className="grid grid-cols-6 gap-2">
							{ColorRow.map((color) => (
								<div
									key={color.from}
									onClick={() => handleChooseColor(color)}
									style={{
										backgroundImage: `linear-gradient(to bottom, ${color.from}, ${color.to})`,
									}}
									className="h-[40px] rounded flex justify-center items-center"
								>
									{color.from === inputColor.from &&
										color.to === inputColor.to && (
											<img src={Tick} className="w-[16px] h-[16px]" alt="" />
										)}
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="p-3 pb-5 border-b mt-1">
					<div className="text-[24px] font-medium">Board title</div>
					<input
						type="text"
						className="mt-1 px-3 py-2 border border-[#DEE2E6] rounded w-full outline-none hover:border-blue-500 focus:border-blue-500"
						placeholder="E.g. Shopping list for birthday..."
						value={input}
						onChange={handleInput}
					/>
					<div className="mt-2 text-[16px] text-[#212529]">
						👋 Please provide a valid board title.
					</div>
				</div>
				<div className="p-3 flex justify-end gap-2">
					<button
						onClick={onClose}
						className="px-2 py-1 border border-[#DC3545] text-[#DC3545] rounded"
					>
						Close
					</button>
					<button
						onClick={() => {
							onSave(input, inputImage || imageRow[0].image);
							setInput("");
							setInputImage("");
							setInputColor({ from: "", to: "" });
						}}
						className="px-2 py-1 border border-[#0D6EFD] text-[#0D6EFD] rounded"
					>
						{isEdit ? "Save" : "Create"}
					</button>
				</div>
			</div>
		</div>
	);
};
