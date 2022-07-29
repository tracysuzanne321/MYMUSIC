import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Playlist from './pages/Playlist';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Footer from './components/Footer';

const App = () => {
	return (
		<div className="App">
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
		</div>
	);
};

export default App;
