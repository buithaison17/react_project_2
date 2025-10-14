import { useNavigate } from "react-router-dom";
import Logo from "../assets/icons/trello-logo.png";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import React, { useEffect, useState } from "react";
import { addUser, fetchData } from "../store/usersReducer";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { validatePassword } from "../utils/validate";
import type { User } from "../utils/type";

export const Register = () => {
	const { users } = useSelector((state: RootState) => state.usersReducer);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);
	const navigate = useNavigate();
	const [inputState, setInputState] = useState({
		email: "",
		username: "",
		password: "",
	});
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setInputState({ ...inputState, [name]: value });
	};
	const onRegister = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const { email, username, password } = inputState;
		if (!email.trim() || !username.trim() || !password.trim) {
			toast.error("Email, mật khẩu hoặc username không được để trống");
			return;
		}
		if (!email.includes("@")) {
			toast.error("Email không đúng định dạng");
			return;
		}
		if (users.some((user) => user.email === email.trim())) {
			toast.error("Email đã tồn tại");
			return;
		}
		if (!validatePassword(password.trim())) {
			toast.error(
				"Mật khẩu tối thiểu 8 ký tự và, ít nhất 1 chữ thường, chữ hoa, số và ký tự đặc biệt"
			);
			return;
		}
		const user: User = {
			id: Math.floor(Math.random() * 1000000).toString(),
			username: username.trim(),
			email: email.trim(),
			password: password.trim(),
			created_at: new Date().toISOString(),
			boards: [],
		};
		toast.success("Đăng kí thành công", {
			autoClose: 1200,
			onClose: () => {
				navigate("/login");
			},
		});
		dispatch(addUser(user));
	};
	return (
		<div className="flex justify-center items-center h-screen">
			<form onSubmit={onRegister} className="w-[300px] p-3 flex flex-col gap-3">
				<img src={Logo} className="w-[150px] m-auto mb-2" alt="" />
				<div className="text-[#212529] text-[26px]">Please sign in</div>
				<div className="flex flex-col">
					<input
						name="email"
						value={inputState.email}
						onChange={handleChangeInput}
						type="text"
						className="border rounded border-[#DEE2E6] px-3 py-1 outline-none hover:border-blue-500 focus:border-blue-500"
						placeholder="Email address"
					/>
					<input
						name="username"
						value={inputState.username}
						onChange={handleChangeInput}
						type="text"
						className="border rounded border-[#DEE2E6] px-3 py-1 outline-none hover:border-blue-500 focus:border-blue-500"
						placeholder="Username"
					/>
					<input
						name="password"
						value={inputState.password}
						onChange={handleChangeInput}
						type="password"
						className="border rounded border-[#DEE2E6] px-3 py-1 outline-none hover:border-blue-500 focus:border-blue-500"
						placeholder="Password"
					/>
				</div>
				<div className="text-[#212529] text-[16px]">
					Already have an account,{" "}
					<span
						onClick={() => navigate("/login")}
						className="text-[16px] text-[#0D6EFD] underline cursor-pointer"
					>
						click here !
					</span>
				</div>
				<button className="bg-blue-500 px-3 py-1 rounded text-white">
					Sign up
				</button>
				<div className="text-[#212529BF] text-[16px] mt-4">
					© 2025 - Rikkei Education
				</div>
			</form>
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
