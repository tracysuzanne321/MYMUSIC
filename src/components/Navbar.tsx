import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const Navbar = () => {
	return (
		<nav className="flex justify-between py-5 max-w-5xl mx-auto">
			<div className="flex items-center space-x-5">
				<Link className="flex items-center" to="/">
					<img alt="logo" className="h-6 " src={logo} />
					<div className=" text-xl ml-2">MyMusic</div>
				</Link>
				<Link to="/search">
					<h3 className="cursor-pointer">Search</h3>
				</Link>
				<Link to="/playlist">
					<h3 className="text-white bg-pink-500 px-4 py-1 rounded-full cursor-pointer hover:bg-white hover:border-pink-500 hover:border hover:text-pink-500 hover:transition-all">
						My Music
					</h3>
				</Link>
			</div>

			<div className="flex items-center space-x-5 ">
				<Link to="/signin">
					<h3 className="cursor-pointer">Sign in</h3>
				</Link>
				<Link to="/signup">
					<h3 className="border cursor-pointer py-1 px-4 rounded-full border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white">
						Sign Up
					</h3>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
