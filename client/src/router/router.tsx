import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import { MainDasboard } from "../layouts/MainDasboard";
import { SecondDashbaord } from "../layouts/SecondDashBoard";
import { Board } from "../pages/Board";
import { MainBoard } from "../layouts/MainBoard";
import { StarredBoard } from "../pages/StarredBoard";
import { BoardClose } from "../pages/BoardClose";

export const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login></Login>,
	},
	{
		path: "/register",
		element: <Register></Register>,
	},
	{
		path: "/dashboard",
		element: <Dashboard></Dashboard>,
		children: [
			{
				index: true,
				element: <MainDasboard></MainDasboard>,
			},
			{
				path: ":type",
				element: <SecondDashbaord></SecondDashbaord>,
			},
		],
	},
	{
		path: "/board",
		element: <Board></Board>,
		children: [
			{
				path: ":id",
				element: <MainBoard></MainBoard>,
			},
		],
	},
	{
		path: "/starred-board",
		element: <StarredBoard></StarredBoard>,
		children: [
			{
				path: ":id",
				element: <MainBoard></MainBoard>,
			},
		],
	},
	{
		path: "close-board",
		element: <BoardClose></BoardClose>,
		children: [
			{
				path: ":id",
				element: <MainBoard></MainBoard>,
			},
		],
	},
]);
