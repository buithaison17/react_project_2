import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

interface Props {
	onClick: () => void;
}

export const CardAddList = ({ onClick }: Props) => {
	return (
		<div
			onClick={onClick}
			className="px-3 py-2 bg-[#F1F2F4] rounded-xl flex items-center gap-2 cursor-pointer"
		>
			<span className="cursor-pointer">
				<AddOutlinedIcon fontSize="small"></AddOutlinedIcon>
			</span>
			<div className="text-[14px] font-medium text-[#172B4D]">
				Add another list
			</div>
		</div>
	);
};
