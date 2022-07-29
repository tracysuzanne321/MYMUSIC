export const getTopTracks = async () => {
	const response = await fetch(
		'https://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4',
	);
	const data = await response.json();
	return data.tracks.map(
		(track: {
			artistId: string;
			name: string;
			artistName: string;
			image: string;
			previewURL: string;
		}) => {
			return {
				name: track.name,
				artistName: track.artistName,
				image: `https://api.napster.com/imageserver/v2/artists/${track.artistId}/images/500x500.jpg`,
				preview: track.previewURL,
			};
		},
	);
};
