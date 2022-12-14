import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { AiOutlineHome } from 'react-icons/ai';
import { FiHeadphones } from 'react-icons/fi';
import { AppContext } from '../App.Context';
import { useContext } from 'react';
import { userContextType } from '../typings';
import profile from '../images/profile.svg';
import { logOut } from '../utils';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const { user, setUser } = useContext<userContextType>(AppContext);
	const navigate = useNavigate();
	console.log(user);
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
				<div className="dropdown  ">
					<img
						className="w-10 h-10 cursor-pointer "
						src={profile}
						alt="profile placeholder"
					/>
					<div className="dropdown-content border border-white px-2 py-2 ">
						<p className="text-white pt-2 ">Signed in as</p>
						<div className="text-pink-500  pb-2">{user?.username}</div>
						<Link to="/settings">Profile</Link>
						<Link
							to="/"
							onClick={async () => {
								await logOut();
								setUser({
									username: '',
									email: '',
									id: '',
								});

								navigate('/');
							}}>
							Log Out
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
