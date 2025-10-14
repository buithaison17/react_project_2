interface Props {
	onClick: () => void;
}

export const CardCreateNewBoard = ({ onClick }: Props) => {
	return (
		<div
			onClick={onClick}
			className="h-[130px] bg-[#F1F2F4] rounded flex justify-center items-center"
		>
			<button className="px-2 py-1 rounded-md border border-[#6C757D] text-[16px] text-[#6C757D]">
				Create new board
			</button>
		</div>
	);
};
