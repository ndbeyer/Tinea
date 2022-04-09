export type LoginJWT = {
	userId?: string;
	roles?: Role[];
};

export type Role = 'ROOT' | 'ADMIN' | 'USER';

export type Viewer = {
	userId?: string;
	roles?: Role[];
	isAdmin?: boolean;
};

export type Context = {
	viewer: Viewer;
};
