export interface Track {
	name: string;
	artistName: string;
	image: string;
	previewURL: string;
	artistId: string;
}

export interface User {
	email: string;
	password: string;
}

export type userContextType = {
	user?: User;
	setUser: (user: User) => void;
};
