import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { SidebarDasboard } from "../components/SidebarDasboard";
import { ModalCreateNewBoard } from "../components/ModalCreateNewBoard";
import { useEffect, useState } from "react";
import type { Board, User } from "../utils/type";
import { ModalDelete } from "../components/ModalDelete";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { editUser, fetchData } from "../store/usersReducer";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { SidebarDasboardMobile } from "../components/SidebarDasboardMobile";

export const Dashboard = () => {
	const navigate = useNavigate();
	// Lấy dữ liệu trên store
	const { users, currentUserId } = useSelector(
		(state: RootState) => state.usersReducer
	);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);
	const currentUser = users.find((user) => user.id === currentUserId);
	// State Modal thêm
	const [createBoard, setCreateBoard] = useState(false);
	const handleOpenCreateBoard = (): void => {
		setCreateBoard(true);
	};
	const handleCloseCreateBoard = (): void => {
		setCreateBoard(false);
		setEditBoard(null);
	};
	const onCreateBoard = (title: string, image: string): void => {
		if (!title.trim()) {
			toast.error("Tên board không được để trống");
			return;
		}
		if (!currentUser) return;
		if (!editBoard) {
			const newBoard: Board = {
				id: Math.floor(Math.random() * 1000000).toString(),
				title: title.trim(),
				backdrop: image,
				description: "",
				type: "normal",
				created_at: new Date().toISOString(),
				lists: [],
			};
			const updates: User = {
				...currentUser,
				boards: [...currentUser.boards, newBoard],
			};
			toast.success("Tạo board mới thành công");
			dispatch(editUser(updates));
		} else {
			const boardUpdates: Board = {
				...editBoard,
				title: title.trim(),
				backdrop: image,
			};
			const updates: User = {
				...currentUser,
				boards: currentUser.boards.map((board) =>
					board.id === editBoard.id ? boardUpdates : board
				),
			};
			toast.success("Sửa board thành công");
			dispatch(editUser(updates));
		}
		handleCloseCreateBoard();
	};
	// State Modal xóa
	const [deleteBoard, setDeleteBoard] = useState("");
	const handleOpenDeleteBoard = (idBoard: string): void => {
		setDeleteBoard(idBoard);
	};
	const handleCloseDeleteBoard = (): void => {
		setDeleteBoard("");
	};
	const onDeleteBoard = (): void => {
		if (!currentUser) return;
		const updates: User = {
			...currentUser,
			boards: currentUser.boards.filter((board) => board.id !== deleteBoard),
		};
		toast.success("Xóa board thành công");
		dispatch(editUser(updates));
		handleCloseDeleteBoard();
	};
	//State sửa board
	const [editBoard, setEditBoard] = useState<Board | null>(null);
	const handleEditBoard = (board: Board): void => {
		setEditBoard(board);
		handleOpenCreateBoard();
	};
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
	const [openSidebarMobile, setOpenSidebarMobile] = useState(false);
	return (
		<div className="flex flex-col h-screen overflow-y-auto">
			<Header openSidebarMobile={() => setOpenSidebarMobile(true)}></Header>
			<div className="flex flex-1">
				<SidebarDasboard></SidebarDasboard>
				{openSidebarMobile && (
					<SidebarDasboardMobile
						closeSidebarMobile={() => setOpenSidebarMobile(false)}
					></SidebarDasboardMobile>
				)}
				<Outlet
					context={{
						currentUser,
						handleOpenCreateBoard,
						handleOpenDeleteBoard,
						handleEditBoard,
						handleNavigate,
					}}
				></Outlet>
			</div>
			{createBoard && (
				<ModalCreateNewBoard
					onClose={handleCloseCreateBoard}
					onSave={onCreateBoard}
					isEdit={editBoard}
				></ModalCreateNewBoard>
			)}
			{deleteBoard && (
				<ModalDelete
					onClose={handleCloseDeleteBoard}
					onSubmit={onDeleteBoard}
				></ModalDelete>
			)}
			<ToastContainer
				position="top-left"
				autoClose={1500}
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
		</div>
	);
};
