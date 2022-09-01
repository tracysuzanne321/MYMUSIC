import { useEffect, useState } from 'react';
import { getTopTracks } from '../utils';
import { Track } from '../typings';

let audio: HTMLAudioElement | null = null;

const Tiles = () => {
	const [tracks, setTracks] = useState<Track[]>([]);
	const [error, setError] = useState('');
	const [playing, setPlaying] = useState(false);
	const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

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

						<div className="flex flex-col justify-between h-1/3">
							<div className="flex flex-col justify-between">
								<p className="text-sm text-white font-bold truncate">
									{track.name}
								</p>
								<p className="text-sm text-white">{track.artistName}</p>
							</div>
							<div className="flex justify-between">
								<button
									className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
									onClick={() => {
										if (currentTrack && currentTrack.name === track.name) {
											if (audio) {
												if (playing) {
													audio.pause();
													setPlaying(false);
												} else {
													audio.play();
													setPlaying(true);
												}
											}
										} else {
											if (audio) {
												audio.pause();
											}
											audio = new Audio(track.previewURL);
											audio.play();
											setPlaying(true);
											setCurrentTrack(track);
										}
									}}>
									{playing && currentTrack && currentTrack.name === track.name
										? 'Pause'
										: 'Play Track'}
								</button>
							</div>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default Tiles;
