import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import type { User } from "../utils/type";
import axios from "axios";
import { toast } from "react-toastify";

interface StateType {
	users: User[];
	currentUserId: string;
}

const initialState: StateType = {
	users: [],
	currentUserId: localStorage.getItem("currentUserId") || "",
};

export const fetchData = createAsyncThunk("users/set", async () => {
	const response = await axios.get("http://localhost:8080/users");
	return response.data;
});

export const addUser = createAsyncThunk<User, User>(
	"users/add",
	async (user) => {
		const response = await axios.post("http://localhost:8080/users", user);
		return response.data;
	}
);

export const editUser = createAsyncThunk<User, User>(
	"users/edit",
	async (user) => {
		const response = await axios.put(
			`http://localhost:8080/users/${user.id}`,
			user
		);
		return response.data;
	}
);

const usersReducer = createSlice({
	name: "usersReducer",
	initialState,
	reducers: {
		loginUser: (state, action: PayloadAction<User>) => {
			state.currentUserId = action.payload.id;
			localStorage.setItem("currentUserId", action.payload.id);
		},
		logoutUser: (state) => {
			state.currentUserId = "";
			localStorage.removeItem("currentUserId");
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchData.fulfilled, (state, action) => {
			state.users = [...action.payload];
		});
		builder.addCase(fetchData.rejected, () => {
			toast.error("Đã xảy ra lỗi, vui lòng thử lại");
		});
		builder.addCase(addUser.fulfilled, (state, action) => {
			state.users = [...state.users, action.payload];
		});
		builder.addCase(addUser.rejected, () => {
			toast.error("Đã xảy ra lỗi vui lòng thử lại");
		});
		builder.addCase(editUser.fulfilled, (state, action) => {
			state.users = state.users.map((user) =>
				user.id === action.payload.id
					? {
							...user,
							boards: action.payload.boards,
					  }
					: user
			);
		});
		builder.addCase(editUser.rejected, () => {
			toast.error("Đã xảy ra lỗi vui lòng thử lại");
		});
	},
});

export const { loginUser, logoutUser } = usersReducer.actions;
export default usersReducer.reducer;
