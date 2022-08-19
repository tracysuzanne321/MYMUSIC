import { useEffect, useState } from 'react';
import { getTopTracks } from '../utils';
import { Track } from '../typings';

const Tiles = () => {
	const [tracks, setTracks] = useState<Track[]>([]);
	const [error, setError] = useState('');

	useEffect(() => {
		setTimeout(() => {
			try {
				const fetchData = async () => {
					const topTracks = await getTopTracks();
					setTracks(topTracks);
				};

				fetchData();
			} catch (error) {
				console.log(error);
				setError('Could not fetch Data');
			}
		}, 1000);
	}, []);
	return (
		<div className="flex flex-wrap max-w-5xl mx-auto justify-center mt-4 pb-28">
			{error && <p>{error}</p>}
			{tracks.length === 0 ? (
				<div className="lds-ellipsis">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			) : (
				tracks.map((track) => (
					<div
						className="flex flex-col p-2 w-64 xs:w-1/2 space-y-1  "
						key={`${track.name}_${track.artistName}`}>
						<img
							className="rounded h-2/3 object-cover"
							alt={`${track.name} cover art`}
							src={track.image}
						/>

						<audio
							title="sounds"
							className="audio-player"
							controls
							preload="auto"
							loop
							controlsList="nodownload noplaybackrate">
							<source src={track.previewURL} type="audio/mpeg" />
							Your browser does not support the audio element.
						</audio>
						<div className="text-sm truncate text-white">{track.name}</div>
						<div className="text-xs text-white">{track.artistName}</div>
						<div className="w-full bg-black border border-white text-center text-white p-1.5 rounded hover:bg-pink-500 hover:border hover:border-pink-500 cursor-pointer">
							Save Track
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default Tiles;
