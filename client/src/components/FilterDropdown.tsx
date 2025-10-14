import CloseIcon from "@mui/icons-material/Close";
import NoDateIcon from "../assets/icons/no-date-icon.png";
import OverdueIcon from "../assets/icons/overdue-icon.png";
import NextdayIcon from "../assets/icons/next-day-icon.png";
import NoLabelIcon from "../assets/icons/no-label-icon.png";
import type React from "react";

interface Props {
	onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
	onClose: () => void;
	inputFilter: {
		keyword: string;
		cardStatus: string;
		dueDate: string;
	};
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FilterDropdown = ({
	onClick,
	onClose,
	handleChangeInput,
	inputFilter,
}: Props) => {
	return (
		<div onClick={onClick} className="absolute top-8 right-0">
			<div className="w-[384px] bg-white rounded-lg p-4 shadow">
				<div className="flex items-center justify-between">
					<div className="flex-1 text-center text-[14px] font-semibold text-[#44546F]">
						Filter
					</div>
					<div onClick={onClose} className="cursor-pointer">
						<CloseIcon fontSize="small"></CloseIcon>
					</div>
				</div>
				<div className="mt-3 flex flex-col gap-2">
					<div className="text-[12px] text-[#44546F] font-semibold">
						Keyword
					</div>
					<input
						name="keyword"
						value={inputFilter.keyword}
						onChange={handleChangeInput}
						type="text"
						className="px-3 py-1 w-full outline-none border rounded hover:border-blue-500 focus:border-blue-500"
					/>
					<div className="text-[12px] text-[#44546F] font-semibold">
						Search cards,
					</div>
				</div>
				<div className="mt-3 flex flex-col gap-2">
					<div className="text-[12px] text-[#44546F] font-semibold">
						Card status
					</div>
					<div className="flex gap-2 items-center">
						<input
							type="checkbox"
							name="cardStatus"
							value="success"
							onChange={handleChangeInput}
							checked={inputFilter.cardStatus === "success"}
							id="marked-as-complete"
						/>
						<label
							className="text-[14px] font-semibold text-[#172B4D]"
							htmlFor="marked-as-complete"
						>
							Marked as complete
						</label>
					</div>
					<div className="flex gap-2 items-center">
						<input
							type="checkbox"
							name="cardStatus"
							value="pending"
							onChange={handleChangeInput}
							checked={inputFilter.cardStatus === "pending"}
							id="not-marked-as-complete"
						/>
						<label
							className="text-[14px] font-semibold text-[#172B4D]"
							htmlFor="not-marked-as-complete"
						>
							Not marked as complete
						</label>
					</div>
				</div>
				<div className="mt-3 flex flex-col gap-2">
					<div className="text-[12px] text-[#44546F] font-semibold">
						Due date
					</div>
					<div className="flex gap-3 items-center">
						<input
							name="dueDate"
							value="noDates"
							onChange={handleChangeInput}
							checked={inputFilter.dueDate === "noDates"}
							id="no-dates"
							type="checkbox"
						/>
						<div className="flex gap-1 items-center">
							<img src={NoDateIcon} className="w-[24px] h-[24px]" alt="" />
							<label
								htmlFor="no-dates"
								className="text-[12px] text-[#44546F] font-semibold"
							>
								No dates
							</label>
						</div>
					</div>
					<div className="flex gap-3 items-center">
						<input
							name="dueDate"
							value="overdue"
							onChange={handleChangeInput}
							checked={inputFilter.dueDate === "overdue"}
							type="checkbox"
							id="overdue"
						/>
						<div className="flex gap-1 items-center">
							<img src={OverdueIcon} className="w-[24px] h-[24px]" alt="" />
							<label
								htmlFor="overdue"
								className="text-[12px] text-[#44546F] font-semibold"
							>
								Overdue
							</label>
						</div>
					</div>
					<div className="flex gap-3 items-center">
						<input
							name="dueDate"
							value="nextDay"
							onChange={handleChangeInput}
							checked={inputFilter.dueDate === "nextDay"}
							id="next-day"
							type="checkbox"
						/>
						<div className="flex gap-1 items-center">
							<img src={NextdayIcon} className="w-[24px] h-[24px]" alt="" />
							<label
								htmlFor="next-day"
								className="text-[12px] text-[#44546F] font-semibold"
							>
								Due in the next day
							</label>
						</div>
					</div>
				</div>
				<div className="mt-3 flex flex-col gap-2">
					<div className="text-[12px] text-[#44546F] font-semibold">Labels</div>
					<div className="flex gap-3 items-center">
						<input id="no-label" type="checkbox" />
						<div className="flex gap-1 items-center">
							<img src={NoLabelIcon} className="w-[24px] h-[24px]" alt="" />
							<label
								htmlFor="no-label"
								className="text-[12px] text-[#44546F] font-semibold"
							>
								No label
							</label>
						</div>
					</div>
					<div className="flex gap-3 items-center">
						<input id="no-label" type="checkbox" />
						<select className="w-full px-3 py-1 border rounded outline-none hover:border-blue-500 focus:border-blue-500">
							<option value="Select labels">Select labels</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
};
