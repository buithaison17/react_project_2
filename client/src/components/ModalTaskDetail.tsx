import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import DesIcon from "../assets/icons/des-icon.png";
import LabelIcon from "../assets/icons/label-icon.png";
import DateIcon from "../assets/icons/date-icon.png";
import DeleteIcon from "../assets/icons/delete-icon.png";
import MDEditor from "@uiw/react-md-editor";
import EditIcon from "@mui/icons-material/Edit";	
import type { Task } from "../utils/type";
import { useState } from "react";

interface Props {
	task: Task;
	onClose: () => void;
	onSubmit: (title: string, description: string) => void;
	handleDelete: () => void;
	viewLabels: () => void;
}

export const ModalTaskDetail = ({
	onClose,
	task,
	onSubmit,
	handleDelete,
	viewLabels,
}: Props) => {
	const [inputState, setInputState] = useState({
		title: task.title,
		description: task.description,
	});
	return (
		<div className="fixed inset-0 flex justify-center items-center z-10">
			<div onClick={onClose} className="fixed inset-0 bg-black/30"></div>
			<div className="w-[768px] bg-white rounded-xl p-4 z-20">
				<div className="flex items-center gap-2">
					<PanoramaFishEyeIcon fontSize="small"></PanoramaFishEyeIcon>
					<div className="text-[20px] font-semibold text-[#172B4D]">
						Kịch bản
					</div>
				</div>
				<div className="ml-7 mt-2 text-[14px] text-[#44546F]">
					in list{" "}
					<select className="px-1 bg-[#DCDFE4] rounded text-[12px] font-bold">
						<option value="Sơn bùi">sơn bùi</option>
					</select>
				</div>
				<div className="mt-4 flex flex-col gap-2">
					<div className="flex gap-2 items-center">
						<EditIcon fontSize="small"></EditIcon>
						<div className="font-semibold text-[16px] text-[#172B4D]">
							Tiêu đề
						</div>
					</div>
					<input
						type="text"
						value={inputState.title}
						onChange={(e) =>
							setInputState({ ...inputState, title: e.target.value })
						}
						className="border w-[512px] ml-7 px-3 py-1 rounded outline-none focus:border-blue-500 hover:border-blue-500"
					/>
				</div>
				<div className="flex justify-between mt-4">
					<div className="flex flex-col gap-4">
						<div className="flex gap-2 items-center">
							<img src={DesIcon} className="w-[]24px h-[24px]" alt="" />
							<div className="font-semibold text-[16px] text-[#172B4D]">
								Description
							</div>
						</div>
						<MDEditor
							value={inputState.description}
							onChange={(value) =>
								setInputState({ ...inputState, description: value as string })
							}
							className="h-[275px] w-[512px] ml-7"
						></MDEditor>
					</div>
					<div className="flex flex-col gap-2">
						<div
							onClick={viewLabels}
							className="flex items-center gap-2 w-[168px] px-3 py-2 bg-gray-200 rounded cursor-pointer"
						>
							<img src={LabelIcon} className="w-[16px] h-[16px]" alt="" />
							<div className="text-[14px] text-[#172B4D] font-medium">
								Label
							</div>
						</div>
						<div className="flex items-center gap-2 w-[168px] px-3 py-2 bg-gray-200 rounded cursor-pointer">
							<img src={DateIcon} className="w-[16px] h-[16px]" alt="" />
							<div className="text-[14px] text-[#172B4D] font-medium">
								Dates
							</div>
						</div>
						<div
							onClick={handleDelete}
							className="flex items-center gap-2 w-[168px] px-3 py-2 bg-red-500 rounded cursor-pointer"
						>
							<img src={DeleteIcon} className="w-[16px] h-[16px]" alt="" />
							<div className="text-[14px] text-white font-medium">Delete</div>
						</div>
					</div>
				</div>
				<div className="mt-4 ml-7 flex gap-2 items-center">
					<button
						onClick={() => onSubmit(inputState.title, inputState.description)}
						className="px-2 py-1 rounded bg-blue-500 text-white"
					>
						Save
					</button>
					<button onClick={onClose} className="px-2 py-1 rounded">
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};
