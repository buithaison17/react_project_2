import Icon from "../assets/icons/warning-icon.png";

interface Props {
	onClose: () => void;
	onSubmit: () => void;
}

export const ModalDelete = ({ onClose, onSubmit }: Props) => {
	return (
		<div className="fixed inset-0 flex justify-center items-center z-20">
			<div onClick={onClose} className="fixed inset-0 bg-black/30"></div>
			<div className="w-[512px] bg-white rounded z-10 flex flex-col gap-3 justify-center items-center p-6">
				<img src={Icon} className="w-[88px] h-[88px]" alt="" />
				<div className="text-[30px] font-semibold text-[#545454]">
					Are you sure?
				</div>
				<div className="text-[18px] text-[#545454]">
					You won't be able to revert this!
				</div>
				<div className="flex gap-2">
					<button
						onClick={onSubmit}
						className="px-3 py-2 text-white bg-blue-500 rounded"
					>
						Yes, delete it!
					</button>
					<button
						onClick={onClose}
						className="px-3 py-2 text-white bg-red-500 rounded"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};
