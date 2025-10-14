import { Outlet, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { SidebarBoard } from "../components/SidebarBoard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchData } from "../store/usersReducer";

export const StarredBoard = () => {
	// Lấy dữ liệu trên store
	const { users, currentUserId } = useSelector(
		(state: RootState) => state.usersReducer
	);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);
	const { id } = useParams();
	const currentUser = users.find((user) => user.id === currentUserId);
	const currentBoard = currentUser?.boards.find((board) => board.id === id);
	return (
		<div className="flex flex-col h-screen overflow-y-auto">
			<Header></Header>
			<div className="flex flex-1">
				<SidebarBoard currentUser={currentUser!} type="starred"></SidebarBoard>
				<Outlet context={{ currentUser, currentBoard }}></Outlet>
			</div>
		</div>
	);
};
