import { Track, User } from '../typings';

const apiUrl = process.env.REACT_APP_API_BASE_URL;
const reactAppDomain = process.env.REACT_APP_DOMAIN;

export const getTopTracks = async () => {
	try {
		const response = await fetch(
			'https://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4',
		);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		const data = await response.json();
		return data.tracks.map((track: Track) => {
			return {
				name: track.name,
				artistName: track.artistName,
				image: `https://api.napster.com/imageserver/v2/artists/${track.artistId}/images/500x500.jpg`,
				previewURL: track.previewURL,
			};
		});
	} catch (err: any) {
		console.log(err.message);
	}
};

export const createUser = async (email: User, password: User) => {
	try {
		const response = await fetch(`${apiUrl}/user`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		const data = await response.json();
		document.cookie = `authToken=${data.token};max-age-604800;domain=${reactAppDomain}`;
		return {
			email: data.result.email,
			id: data.result._id,
		};
	} catch (error) {
		console.log(error);
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
				email: data.user.email,
				password: data.user.password,
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
