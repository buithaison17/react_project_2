import StarBorderIcon from "@mui/icons-material/StarBorder";
import BoardIcon from "../assets/icons/board-icon.png";
import TableIcon from "../assets/icons/table-icon.png";
import CloseIcon from "../assets/icons/close-icon.png";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { CardList } from "../components/CardList";
import { CardAddList } from "../components/CardAddList";
import { ModalAddList } from "../components/ModalAddList";
import type { Board, List, Tag, Task, User } from "../utils/type";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { editUser } from "../store/usersReducer";
import { ModalDelete } from "../components/ModalDelete";
import { ModalTaskDetail } from "../components/ModalTaskDetail";
import { ModalLabel } from "../components/ModalLabel";
import { ModalCreateLabel } from "../components/ModalCreateLabel";

interface BoardContextType {
	currentUser: User;
	currentBoard: Board;
}

export const MainBoard = () => {
	// Lấy dữ liệu context
	const { currentUser, currentBoard } = useOutletContext<BoardContextType>();
	const dispatch = useDispatch<AppDispatch>();
	// Thêm List
	const [addList, setAddList] = useState(false);
	const handleOpenAddList = (): void => {
		setAddList(true);
	};
	const handleCloseAddList = (): void => {
		setAddList(false);
	};
	const onAddList = (title: string): void => {
		if (!currentUser || !currentBoard) return;
		if (!title.trim()) {
			toast.error("Tên danh sách công việc không được để trống");
			return;
		}
		const newList: List = {
			id: Math.floor(Math.random() * 1000000).toString(),
			title: title.trim(),
			created_at: new Date().toISOString(),
			tasks: [],
		};
		const boardUpdates: Board = {
			...currentBoard,
			lists: [...currentBoard.lists, newList],
		};
		const updates: User = {
			...currentUser,
			boards: currentUser.boards.map((board) =>
				board.id === currentBoard.id ? boardUpdates : board
			),
		};
		toast.success("Thêm danh sách công việc thành công");
		dispatch(editUser(updates));
		handleCloseAddList();
	};
	// Xóa list
	const [idDeleteList, setIdDeleteList] = useState("");
	const onDeleteList = (): void => {
		const boardUpdates: Board = {
			...currentBoard,
			lists: currentBoard.lists.filter((list) => list.id !== idDeleteList),
		};
		const updates: User = {
			...currentUser,
			boards: currentUser.boards.map((board) =>
				board.id === currentBoard.id ? boardUpdates : board
			),
		};
		toast.success("Xóa danh sách công việc thành công");
		dispatch(editUser(updates));
		setIdDeleteList("");
	};
	// Sửa list
	const onEditList = (list: List, title: string): void => {
		if (!title.trim()) {
			toast.error("Tên danh sách công việc không được để trống");
			return;
		}
		const listUpdates: List = {
			...list,
			title: title.trim(),
		};
		const boardUpdates: Board = {
			...currentBoard,
			lists: currentBoard.lists.map((item) =>
				item.id === list.id ? listUpdates : item
			),
		};
		const updates: User = {
			...currentUser,
			boards: currentUser.boards.map((board) =>
				board.id === currentBoard.id ? boardUpdates : board
			),
		};
		toast.success("Sửa danh sách công việc thành công");
		dispatch(editUser(updates));
	};
	// Thêm task
	const onAddTask = (list: List, title: string): void => {
		if (!title.trim()) {
			toast.error("Tên công việc không được để trống");
			return;
		}
		const newTask: Task = {
			id: Math.floor(Math.random() * 1000000).toString(),
			title: title.trim(),
			description: "",
			status: "pending",
			tags: [],
		};
		const listUpdates: List = {
			...list,
			tasks: [...list.tasks, newTask],
		};
		const boardUpdates: Board = {
			...currentBoard,
			lists: currentBoard.lists.map((item) =>
				item.id === list.id ? listUpdates : item
			),
		};
		const updates: User = {
			...currentUser,
			boards: currentUser.boards.map((board) =>
				board.id === currentBoard.id ? boardUpdates : board
			),
		};
		toast.success("Thêm công việc mới thành công");
		dispatch(editUser(updates));
	};
	// Thêm chi tiết cho task
	const [taskDetail, setTaskDetail] = useState<{
		list: List;
		task: Task;
	} | null>(null);
	const onAddDetail = (title: string, description: string): void => {
		if (!taskDetail) return;
		if (!title.trim()) {
			toast.error("Tên công việc không được để trống");
			return;
		}
		if (!description.trim()) {
			toast.error("Mô tả không được để trống");
			return;
		}
		const { task, list } = taskDetail;
		const taskUpdates: Task = {
			...task,
			title: title.trim(),
			description: description.trim(),
		};
		const listUpdates: List = {
			...list,
			tasks: list.tasks.map((t) => (t.id === task.id ? taskUpdates : t)),
		};
		const boardUpdates: Board = {
			...currentBoard,
			lists: currentBoard.lists.map((item) =>
				item.id === list.id ? listUpdates : item
			),
		};
		const updates: User = {
			...currentUser,
			boards: currentUser.boards.map((board) =>
				board.id === currentBoard.id ? boardUpdates : board
			),
		};
		toast.success("Thêm chi tiết thành công");
		dispatch(editUser(updates));
		setTaskDetail(null);
	};
	// Xóa task
	const [deleteTask, setDeleteTask] = useState<{
		list: List;
		task: Task;
	} | null>(null);
	const onDeleteTask = (): void => {
		if (!deleteTask) return;
		const { list, task } = deleteTask;
		const listUpdates: List = {
			...list,
			tasks: list.tasks.filter((t) => t.id !== task.id),
		};
		const boardUpdates: Board = {
			...currentBoard,
			lists: currentBoard.lists.map((item) =>
				item.id === list.id ? listUpdates : item
			),
		};
		const updates: User = {
			...currentUser,
			boards: currentUser.boards.map((board) =>
				board.id === currentBoard.id ? boardUpdates : board
			),
		};
		toast.success("Xóa công việc thành công");
		dispatch(editUser(updates));
		setTaskDetail(null);
		setDeleteTask(null);
	};
	// Xem labels
	const [viewLabels, setViewLabels] = useState<{
		list: List;
		task: Task;
	} | null>(null);
	// Thêm labels
	const [addLabels, setAddLabels] = useState<{ list: List; task: Task } | null>(
		null
	);
	const onAddLabel = (title: string, color: string): void => {
		if (!title.trim()) {
			toast.error("Tên tag không được để trống");
			return;
		}
		if (!color) {
			toast.error("Màu tag không được để trông	");
			return;
		}
		if (!addLabels) return;
		if (!editLabel) {
			const { list, task } = addLabels;
			const newTag: Tag = {
				id: Math.floor(Math.random() * 1000000).toString(),
				content: title.trim(),
				color: color,
			};
			const taskUpdates: Task = {
				...task,
				tags: [...task.tags, newTag],
			};
			const listUpdates: List = {
				...list,
				tasks: list.tasks.map((t) => (t.id === task.id ? taskUpdates : t)),
			};
			const boardUpdates: Board = {
				...currentBoard,
				lists: currentBoard.lists.map((item) =>
					item.id === list.id ? listUpdates : item
				),
			};
			const updates: User = {
				...currentUser,
				boards: currentUser.boards.map((board) =>
					board.id === currentBoard.id ? boardUpdates : board
				),
			};
			toast.success("Thêm tag mời thành công");
			dispatch(editUser(updates));
			setViewLabels({ ...viewLabels, list: listUpdates, task: taskUpdates });
		} else {
			const { list, task, tag } = editLabel;
			const tagUpdates: Tag = {
				...tag,
				content: title.trim(),
				color: color,
			};
			const taskUpdates: Task = {
				...task,
				tags: task.tags.map((t) => (t.id === tag.id ? tagUpdates : t)),
			};
			const listUpdates: List = {
				...list,
				tasks: list.tasks.map((t) => (t.id === task.id ? taskUpdates : t)),
			};
			const boardUpdates: Board = {
				...currentBoard,
				lists: currentBoard.lists.map((item) =>
					item.id === list.id ? listUpdates : item
				),
			};
			const updates: User = {
				...currentUser,
				boards: currentUser.boards.map((board) =>
					board.id === currentBoard.id ? boardUpdates : board
				),
			};
			toast.success("Sửa tag thành công");
			dispatch(editUser(updates));
			setViewLabels({ ...viewLabels, list: listUpdates, task: taskUpdates });
		}
		setAddLabels(null);
		setEditLabel(null);
	};
	// Sửa labels
	const [editLabel, setEditLabel] = useState<{
		list: List;
		task: Task;
		tag: Tag;
	} | null>(null);
	// Thay đổi trạng thái công việc
	const toggleStatus = (list: List, task: Task): void => {
		const taskUpdates: Task = {
			...task,
			status: task.status === "pending" ? "success" : "pending",
		};
		const listUpdates: List = {
			...list,
			tasks: list.tasks.map((t) => (t.id === task.id ? taskUpdates : t)),
		};
		const boardUpdates: Board = {
			...currentBoard,
			lists: currentBoard.lists.map((item) =>
				item.id === list.id ? listUpdates : item
			),
		};
		const updates: User = {
			...currentUser,
			boards: currentUser.boards.map((board) =>
				board.id === currentBoard.id ? boardUpdates : board
			),
		};
		toast.success("Thay đổi trạng thái thành công");
		dispatch(editUser(updates));
	};
	// Thay đổi kiểu board từ thường thành starred và ngược lại
	const navigate = useNavigate();
	const changeTypeBoard = (): void => {
		const boardUpdates: Board = {
			...currentBoard,
			type: currentBoard.type === "starred" ? "normal" : "starred",
		};
		const updates: User = {
			...currentUser,
			boards: currentUser.boards.map((board) =>
				board.id === currentBoard.id ? boardUpdates : board
			),
		};
		dispatch(editUser(updates));
		switch (boardUpdates.type) {
			case "normal":
				navigate(`/board/${boardUpdates.id}`);
				return;
			case "starred":
				navigate(`/starred-board/${boardUpdates.id}`);
				return;
		}
	};
	return (
		<div className="flex-1">
			<ToastContainer
				position="top-left"
				autoClose={1200}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
				transition={Bounce}
			/>
			<div className="flex items-center justify-between p-4 bg-[#F1F2F4]">
				<div className="flex items-center gap-8">
					<div className="text-[18px] font-bold text-[#172B4D]">
						{currentBoard?.title}
					</div>
					<span onClick={changeTypeBoard} className="cursor-pointer">
						<StarBorderIcon
							fontSize="small"
							className={
								currentBoard.type === "starred" ? "text-yellow-400" : ""
							}
						></StarBorderIcon>
					</span>
					<div className="flex gap-2 items-center">
						<div className="flex items-center gap-2 px-2 py-1 bg-[#00000080] rounded cursor-pointer">
							<img src={BoardIcon} className="w-[16px] h-[16px]" alt="" />
							<div className="text-[14px] font-medium text-white">Board</div>
						</div>
						<div className="flex items-center gap-2 px-2 py-1 cursor-pointer">
							<img src={TableIcon} className="w-[16px] h-[16px]" alt="" />
							<div className="text-[14px] font-medium">Table</div>
						</div>
						<div className="flex items-center gap-2 px-2 py-1 cursor-pointer">
							<img src={CloseIcon} className="w-[16px] h-[16px]" alt="" />
							<div className="text-[14px] font-medium">Close this board</div>
						</div>
					</div>
				</div>
				<div className="flex gap-2 items-center">
					<span className="cursor-pointer">
						<FilterListOutlinedIcon fontSize="small"></FilterListOutlinedIcon>
					</span>
					<div className="text-[14px] font-medium text-[#172B4D]">Filters</div>
				</div>
			</div>
			<div className="p-4 grid grid-cols-4 gap-4 items-start">
				{currentBoard?.lists.map((list) => (
					<CardList
						key={list.id}
						list={list}
						onAddTask={onAddTask}
						handleDeleteList={(id: string) => setIdDeleteList(id)}
						onEditList={onEditList}
						handleAddTaskDetail={(list: List, task: Task) =>
							setTaskDetail({ ...taskDetail, task: task, list: list })
						}
						toggleStatus={toggleStatus}
					></CardList>
				))}
				{!addList && <CardAddList onClick={handleOpenAddList}></CardAddList>}
				{addList && (
					<ModalAddList
						onClose={handleCloseAddList}
						onAdd={onAddList}
					></ModalAddList>
				)}
			</div>
			{idDeleteList && (
				<ModalDelete
					onClose={() => setIdDeleteList("")}
					onSubmit={onDeleteList}
				></ModalDelete>
			)}
			{taskDetail && (
				<ModalTaskDetail
					task={taskDetail.task}
					onClose={() => setTaskDetail(null)}
					onSubmit={onAddDetail}
					handleDelete={() => {
						setDeleteTask({
							...deleteTask,
							list: taskDetail.list,
							task: taskDetail.task,
						});
						setTaskDetail(null);
					}}
					viewLabels={() => {
						setViewLabels({
							...viewLabels,
							list: taskDetail.list,
							task: taskDetail.task,
						});
						setTaskDetail(null);
					}}
				></ModalTaskDetail>
			)}
			{deleteTask && (
				<ModalDelete
					onClose={() => {
						setTaskDetail({
							...taskDetail,
							list: deleteTask.list,
							task: deleteTask.task,
						});
						setDeleteTask(null);
					}}
					onSubmit={onDeleteTask}
				></ModalDelete>
			)}
			{viewLabels && (
				<ModalLabel
					task={viewLabels.task}
					onClose={() => {
						setTaskDetail({
							...taskDetail,
							list: viewLabels.list,
							task: viewLabels.task,
						});
						setViewLabels(null);
					}}
					handleAdd={() => {
						setAddLabels({
							...addLabels,
							list: viewLabels.list,
							task: viewLabels.task,
						});
						setViewLabels(null);
					}}
					handleEdit={(tag) => {
						setEditLabel({
							...editLabel,
							list: viewLabels.list,
							task: viewLabels.task,
							tag: tag,
						});
						setAddLabels({
							...addLabels,
							list: viewLabels.list,
							task: viewLabels.task,
						});
						setViewLabels(null);
					}}
				></ModalLabel>
			)}
			{addLabels && (
				<ModalCreateLabel
					onPrev={() => {
						setViewLabels({
							...viewLabels,
							list: addLabels.list,
							task: addLabels.task,
						});
						setAddLabels(null);
						setEditLabel(null);
					}}
					onClose={() => {
						setTaskDetail({
							...taskDetail,
							list: addLabels.list,
							task: addLabels.task,
						});
						setAddLabels(null);
						setEditLabel(null);
					}}
					onSubmit={onAddLabel}
					isEdit={editLabel?.tag}
				></ModalCreateLabel>
			)}
		</div>
	);
};
