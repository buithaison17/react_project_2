import { useNavigate } from "react-router-dom";
import Logo from "../assets/icons/trello-logo.png";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import React, { useEffect, useState } from "react";
import { fetchData, loginUser } from "../store/usersReducer";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { validatePassword } from "../utils/validate";

export const Login = () => {
	const { users } = useSelector((state: RootState) => state.usersReducer);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);
	const [inputState, setInputState] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setInputState({ ...inputState, [name]: value });
	};
	const onLogin = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const { email, password } = inputState;
		const user = users.find((user) => user.email === email);
		if (!email.trim() || !password.trim()) {
			toast.error("Email hoặc mật khẩu không được để trông");
			return;
		}
		if (!email.includes("@")) {
			toast.error("Email không đúng định dạng");
			return;
		}
		if (!users.some((user) => user.email === email)) {
			toast.error("Email không tồn tại");
			return;
		}
		if (!validatePassword(password)) {
			toast.error(
				"Mật khẩu tối thiểu 8 ký tự và, ít nhất 1 chữ thường, chữ hoa, số và ký tự đặc biệt"
			);
			return;
		}
		if (user!.password !== password) {
			toast.error("Mật khẩu không đúng");
			return;
		}
		dispatch(loginUser(user!));
		navigate("/dashboard");
	};
	return (
		<div className="flex justify-center items-center h-screen">
			<form onSubmit={onLogin} className="w-[300px] p-3 flex flex-col gap-3">
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
						name="password"
						value={inputState.password}
						onChange={handleChangeInput}
						type="password"
						className="border rounded border-[#DEE2E6] px-3 py-1 outline-none hover:border-blue-500 focus:border-blue-500"
						placeholder="Password"
					/>
				</div>
				<div className="flex gap-2 items-center">
					<input id="remember" type="checkbox" />
					<label htmlFor="remember" className="text-[#212529] text-[16px]">
						Remember me
					</label>
				</div>
				<div className="text-[#212529] text-[16px]">
					Don't have an account,{" "}
					<span
						onClick={() => navigate("/register")}
						className="text-[16px] text-[#0D6EFD] underline cursor-pointer"
					>
						click here !
					</span>
				</div>
				<button className="bg-blue-500 px-3 py-1 rounded text-white">
					Sign in
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
