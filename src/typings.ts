export interface Track {
	name: string;
	artistName: string;
	image: string;
	previewURL: string;
	artistId: string;
}

export interface User {
	username?: string;
	email?: string;
	id?: string;
}

export type userContextType = {
	user?: User;
	setUser: (user: User) => void;
};
