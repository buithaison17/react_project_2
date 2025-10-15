import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import type { Task } from "../utils/type";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface InputDate {
	startDate: Date | null;
	dueDate: Date | null;
}

interface Props {
	task: Task;
	onClose: () => void;
	onAdd: (date: InputDate) => void;
}

export const ModalAddDate = ({ task, onClose, onAdd }: Props) => {
	const [enableStart, setEnaleStart] = useState(false);
	const [enableDue, setEnableDue] = useState(false);
	const [fieldSelecting, setFieldSelecting] = useState<"start" | "due" | null>(
		null
	);
	const [inputDate, setInputDate] = useState<InputDate>({
		startDate: null,
		dueDate: null,
	});
	useEffect(() => {
		if (task.due_date) {
			setInputDate({
				startDate: null,
				dueDate: new Date(task.due_date),
			});
			setEnableDue(true);
			setFieldSelecting("due");
		} else {
			setInputDate({ startDate: null, dueDate: null });
			setEnableDue(false);
			setFieldSelecting(null);
		}
	}, [task]);
	const handleEnableStartDate = () => {
		setEnaleStart((prev) => !prev);
		setFieldSelecting("start");
		if (enableStart) setInputDate({ ...inputDate, startDate: null });
	};
	const handleEnableDueDate = () => {
		setEnableDue((prev) => !prev);
		setFieldSelecting("due");
		if (enableDue) setInputDate({ ...inputDate, dueDate: null });
	};
	const handleCalendarChange = (value: Date) => {
		if (fieldSelecting === "start")
			setInputDate({ ...inputDate, startDate: value });
		else if (fieldSelecting === "due")
			setInputDate({ ...inputDate, dueDate: value });
	};
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputDate({ ...inputDate, [name]: value ? new Date(value) : null });
	};

	const formatDate = (value: Date | null): string => {
		if (!value) return "";
		const year = value.getFullYear();
		const month = String(value.getMonth() + 1).padStart(2, "0");
		const day = String(value.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};
	const onRemove = () => {
		setInputDate({ startDate: null, dueDate: null });
		setEnaleStart(false);
		setEnableDue(false);
		setFieldSelecting(null);
	};
	return (
		<div className="fixed inset-0 flex justify-center items-center z-10">
			<div
				onClick={() => {
					onClose();
					setEnableDue(false);
					setEnaleStart(false);
					setInputDate({ ...inputDate, startDate: null, dueDate: null });
					setFieldSelecting(null);
				}}
				className="fixed inset-0 bg-black/30"
			></div>
			<div className="w-fit bg-white p-4 rounded-lg z-20">
				<div className="flex justify-between items-center">
					<div className="text-[14px] text-[#44546F] font-semibold flex-1 text-center">
						Dates
					</div>
					<span
						onClick={() => {
							onClose();
							setEnableDue(false);
							setEnaleStart(false);
							setInputDate({ ...inputDate, startDate: null, dueDate: null });
							setFieldSelecting(null);
						}}
						className="cursor-pointer"
					>
						<CloseIcon fontSize="small"></CloseIcon>
					</span>
				</div>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DateCalendar
						value={
							fieldSelecting === "start"
								? inputDate.startDate
								: inputDate.dueDate
						}
						onChange={(value) => handleCalendarChange(value as Date)}
					/>
				</LocalizationProvider>
				<div className="flex flex-col gap-2">
					<div className="text-[14px] text-[#44546F] font-semibold">
						Start date
					</div>
					<div className="flex items-center gap-3">
						<input
							checked={enableStart}
							onChange={handleEnableStartDate}
							type="checkbox"
						/>
						<input
							name="startDate"
							value={formatDate(inputDate.startDate)}
							onChange={handleInputChange}
							onFocus={() => setFieldSelecting("start")}
							disabled={!enableStart}
							type="date"
							className={`px-2 py-1 rounded shadow ${
								enableStart
									? "border border-[#8590A2]"
									: "bg-[#091E4208] text-[#091E424F]"
							}`}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2 mt-3">
					<div className="text-[14px] text-[#44546F] font-semibold">
						Due date
					</div>
					<div className="flex items-center gap-3">
						<input
							checked={enableDue}
							onChange={handleEnableDueDate}
							type="checkbox"
						/>
						<input
							value={formatDate(inputDate.dueDate)}
							onChange={handleInputChange}
							onFocus={() => setFieldSelecting("due")}
							disabled={!enableDue}
							type="date"
							className={`px-2 py-1 rounded shadow ${
								enableDue
									? "border border-[#8590A2]"
									: "bg-[#091E4208] text-[#091E424F]"
							}`}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2 mt-3">
					<button
						onClick={() => onAdd(inputDate)}
						className="py-2 rounded text-white bg-blue-500"
					>
						Save
					</button>
					<button
						onClick={onRemove}
						className="py-2 rounded bg-[#091E420F] text-[#172B4D]"
					>
						Remove
					</button>
				</div>
			</div>
		</div>
	);
};
