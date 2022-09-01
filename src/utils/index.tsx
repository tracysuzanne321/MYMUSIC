import { Track } from '../typings';

const apiUrl = process.env.REACT_APP_API_BASE_URL;
const reactAppDomain = process.env.REACT_APP_DOMAIN;

export const getTopTracks = async () => {
	try {
		const response = await fetch(
			'https://api.napster.com/v2.1/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4',
		);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		const data = await response.json();
		return data.tracks.map((track: Track) => {
			return {
				name: track.name,
				artistName: track.artistName,
				image: `https://api.napster.com/imageserver/v2/albums/${track.albumId}/images/500x500.jpg`,
				previewURL: track.previewURL,
			};
		});
	} catch (err: any) {
		console.log(err.message);
	}
};

export const addtrack = async (trackDetails: string) => {
	try {
		await fetch(`${apiUrl}/music`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getCookie('authToken')}`,
			},
			body: JSON.stringify(trackDetails),
		});
	} catch (err) {
		throw err;
	}
};

export const getSavedTracks = async () => {
	try {
		const response = await fetch(`${apiUrl}/music`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getCookie('authToken')}`,
			},
		});
		const data = await response.json();
		return data.map((track: Track) => {
			return {
				...track,
				id: `${track.name}_${track.artistName}`,
			};
		});
	} catch (err) {
		throw err;
	}
};

export const deleteTrack = async (trackDetails: Track) => {
	try {
		await fetch(`${apiUrl}/delete_track`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getCookie('authToken')}`,
			},
			body: JSON.stringify(trackDetails),
		});
	} catch (error) {
		throw error;
	}
};

export const createUser = async (
	username: string,
	email: string,
	password: string,
) => {
	try {
		const response = await fetch(`${apiUrl}/user`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: username,
				email: email,
				password: password,
			}),
		});
		const data = await response.json();
		document.cookie = `authToken=${data.token};max-age-604800;path=/`;
		return {
			username: data.result.username,
			email: data.result.email,
			id: data.result._id,
		};
	} catch (error) {
		console.log(error);
	}
};

export const login = async (email: string, password: string) => {
	try {
		const response = await fetch(`${apiUrl}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		const data = await response.json();
		document.cookie = `authToken=${data.token};max-age-604800;path=/`;
		return {
			username: data.user.username,
			email: data.user.email,
			id: data.user._id,
		};
	} catch (error) {
		throw error;
	}
};

export const logOut = async () => {
	document.cookie = `authToken=loggedOut;max-age=0;path=/`;
};

export const updateUser = async (
	username: string,
	email: string,
	password: string,
) => {
	try {
		const response = await fetch(`${apiUrl}/update`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getCookie('authToken')}`,
			},
			body: JSON.stringify({
				username: username,
				email: email,
				password: password,
			}),
		});
		const data = await response.json();
		return {
			username: data.result.username,
			email: data.result.email,
			id: data.result._id,
		};
	} catch (error) {
		throw error;
	}
};

export const deleteUser = async () => {
	try {
		await fetch(`${apiUrl}/delete`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getCookie('authToken')}`,
			},
		});
		return {
			message: 'success',
		};
	} catch (error) {
		throw error;
	}
};

export const attemptTokenLogin = async () => {
	try {
		const token = getCookie('authToken');
		if (token !== null) {
			const response = await fetch(`${apiUrl}/token`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			document.cookie = `authToken=${data.token};max-age=604800;domain=${reactAppDomain}`;
			return {
				username: data.user.username,
				email: data.user.email,
				id: data.user._id,
			};
		}
		return null;
	} catch (error) {
		console.error(error);
		return null;
	}
};
function getCookie(cookiename: string) {
	if (typeof cookiename == 'string' && cookiename !== '') {
		const COOKIES = document.cookie.split(';');
		for (var i = 0; i < COOKIES.length; i++) {
			if (COOKIES[i].trim().startsWith(cookiename)) {
				return COOKIES[i].split('=')[1];
			}
		}
	}
	return null;
}
