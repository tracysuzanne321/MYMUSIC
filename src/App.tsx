import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Playlist from './pages/Playlist';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import { AppContext } from './App.Context';
import { attemptTokenLogin } from './utils';
import { User, Track } from './typings';

const App = () => {
	const [user, setUser] = useState<User>();
	const [savedTracks, setSavedTracks] = useState<Track>();

	console.log(user);
	useEffect(() => {
		async function fetchData() {
			if (!user) {
				const signedInUser = await attemptTokenLogin();
				if (signedInUser) {
					setUser(signedInUser);
				}
			}
		}
		fetchData();
	}, [user, setUser]);

	return (
		<div className="App">
			<AppContext.Provider
				value={{ user, setUser, savedTracks, setSavedTracks }}>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="/playlist" element={<Playlist />} />
						<Route path="/signin" element={<Signin />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
					<Footer />
				</BrowserRouter>
			</AppContext.Provider>
		</div>
	);
};

export default App;
