import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import IconListCard from "../assets/icons/frame.png";
import { CardAddTask } from "./CardAddLTask";
import type { List, Task } from "../utils/type";
import { useState } from "react";

interface Props {
	list: List;
	handleDeleteList: (idList: string) => void;
	onAddTask: (list: List, title: string) => void;
	onEditList: (list: List, title: string) => void;
	handleAddTaskDetail: (list: List, task: Task) => void;
	toggleStatus: (list: List, task: Task) => void;
}

export const CardList = ({
	list,
	onAddTask,
	handleDeleteList,
	onEditList,
	handleAddTaskDetail,
	toggleStatus,
}: Props) => {
	// Tắt mở thêm task
	const [addTask, setAddTask] = useState(false);
	// Tắt mở chỉnh list
	const [isEditList, setIsEditList] = useState(false);
	const [input, setInput] = useState(list.title);
	return (
		<div className="px-3 py-2 bg-[#F1F2F4] rounded-xl">
			<div className="flex justify-between items-center">
				{!isEditList && (
					<div
						onClick={() => setIsEditList(true)}
						className="text-[14px] font-semibold text-[#172B4D] flex-1"
					>
						{list.title}
					</div>
				)}
				{isEditList && (
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => {
							if (e.key !== "Enter") return;
							onEditList(list, input);
							if (input) setIsEditList(false);
						}}
						type="text"
						className="px-3 py-1 w-full border rounded outline-none hover:border-blue-500 focus:border-blue-500"
					/>
				)}
				<MoreHorizOutlinedIcon fontSize="small"></MoreHorizOutlinedIcon>
			</div>
			<div className="mt-2 flex flex-col gap-3">
				{list.tasks.map((task) => (
					<div
						key={task.id}
						className="flex items-center gap-2 px-2 py-1 bg-white rounded-lg shadow"
					>
						<div
							onClick={() => toggleStatus(list, task)}
							className="cursor-pointer"
						>
							<CheckCircleOutlineOutlinedIcon
								className={
									task.status === "pending" ? "text-gray-300" : "text-green-500"
								}
								fontSize="small"
							/>
						</div>
						<div
							onClick={() => handleAddTaskDetail(list, task)}
							className="text-[14px] text-[#626F86] flex-1"
						>
							{task.title}
						</div>
					</div>
				))}
			</div>
			{addTask && (
				<CardAddTask
					onClose={() => setAddTask(false)}
					onAdd={(title: string) => {
						onAddTask(list, title);
						if (title) setAddTask(false);
					}}
				/>
			)}
			{!addTask && (
				<div className="mt-3 flex items-center justify-between">
					<div
						onClick={() => setAddTask(true)}
						className="flex items-center gap-2 cursor-pointer"
					>
						<AddOutlinedIcon fontSize="small"></AddOutlinedIcon>
						<div className="text-[14px] font-medium text-[#44546F]">
							Add a card
						</div>
					</div>
					<img
						onClick={() => handleDeleteList(list.id)}
						src={IconListCard}
						className="w-[16px] h-[16px] cursor-pointer"
						alt=""
					/>
				</div>
			)}
		</div>
	);
};
