import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { AiOutlineHome } from 'react-icons/ai';
import { FiHeadphones } from 'react-icons/fi';
import { AppContext } from '../App.Context';
import { useContext } from 'react';
import { userContextType } from '../typings';
import profile from '../images/profile.svg';

const Navbar = () => {
	const { user } = useContext<userContextType>(AppContext);
	return (
		<nav className="flex justify-between py-5 max-w-5xl mx-auto">
			<div className="flex items-center space-x-10">
				<Link className="flex items-center" to="/">
					<img alt="logo" className="h-6 " src={logo} />
					<div className=" text-2xl ml-2 text-white ">MyMusic</div>
				</Link>
				<Link
					className="hover:text-pink-500 cursor-pointer flex items-center text-lg text-white "
					to="/">
					<AiOutlineHome />
					<h3 className="ml-2">Home</h3>
				</Link>
				<Link
					className="hover:text-pink-500 cursor-pointer flex items-center text-lg text-white"
					to="/playlist">
					<FiHeadphones />
					<h3 className="ml-2">Library</h3>
				</Link>
			</div>
			{user?.email === '' ? (
				<div className="flex items-center space-x-5 ">
					<Link to="/signin">
						<h3 className="text-white border-pink-500 border bg-pink-500 px-4 py-1 rounded-full cursor-pointer hover:bg-black hover:border-white hover:border hover:text-white hover:transition-all">
							Sign in
						</h3>
					</Link>
				</div>
			) : (
				<div className="dropdown flex flex-col items-center space-x-5 ">
					<img
						className="w-10 h-10 cursor-pointer "
						src={profile}
						alt="profile placeholder"
					/>
					<div className="dropdown-content ">
						<Link to="/settings">Profile</Link>
						<Link to="/">Log Out</Link>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
