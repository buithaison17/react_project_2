import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import type { Tag, Task } from "../utils/type";

interface Props {
	task: Task;
	onClose: () => void;
	handleAdd: () => void;
	handleEdit: (tag: Tag) => void;
}

export const ModalLabel = ({ task, onClose, handleAdd, handleEdit }: Props) => {
	return (
		<div className="fixed inset-0 flex justify-center items-center z-10">
			<div onClick={onClose} className="fixed inset-0 bg-black/30"></div>
			<div className="px-4 py-3 bg-white w-[300px] rounded-lg z-20">
				<div className="flex justify-between items-center">
					<div className="flex-1 text-center text-[14px] font-semibold text-[#44546F]">
						Labels
					</div>
					<div onClick={onClose} className="cursor-pointer">
						<CloseIcon fontSize="small"></CloseIcon>
					</div>
				</div>
				<div className="mt-1 text-[12px] font-semibold text-[#44546F]">
					Labels
				</div>
				<div className="flex flex-col gap-1 mt-3">
					{task?.tags.map((tag) => (
						<div key={tag.id} className="flex items-center gap-3">
							<input
								className="w-[16px] h-[16px]"
								type="checkbox"
								name=""
								id=""
							/>
							<div
								style={{ backgroundColor: tag.color }}
								className="flex-1 rounded-md px-4 py-2 text-[#164B35]"
							>
								{tag.content}
							</div>
							<div onClick={() => handleEdit(tag)} className="cursor-pointer">
								<EditIcon fontSize="small"></EditIcon>
							</div>
						</div>
					))}
				</div>
				<div
					onClick={handleAdd}
					className="w-full py-2 text-center rounded bg-[#091E420F] mt-4 text-[14px] text-[#172B4D] font-medium cursor-pointer"
				>
					Create a new label
				</div>
			</div>
		</div>
	);
};
