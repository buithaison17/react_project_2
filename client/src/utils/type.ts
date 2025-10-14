export type TypeBoard = "normal" | "starred" | "close";
export type Status = "pending" | "success";

export interface Tag {
	id: string;
	content: string;
	color: string;
}

export interface Task {
	id: string;
	title: string;
	description: string;
	status: Status;
	tags: Tag[];
}

export interface List {
	id: string;
	title: string;
	created_at: string;
	tasks: Task[];
}

export interface Board {
	id: string;
	title: string;
	description: string;
	backdrop: string;
	type: TypeBoard;
	created_at: string;
	lists: List[];
}

export interface User {
	id: string;
	username: string;
	email: string;
	password: string;
	created_at: string;
	boards: Board[];
}
