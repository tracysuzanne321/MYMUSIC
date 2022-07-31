import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils';
import { AppContext } from '../App.Context';

export const LogInForm = () => {
	const [valid, setValid] = useState(true);
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const { setUser } = useContext(AppContext);

	return (
		<form
			className="flex flex-col   "
			onSubmit={async (e) => {
				e.preventDefault();
				try {
					if (email && password) {
						const userData = await login(email, password);
						setUser(userData);
						navigate('/');
					}
					throw new Error('Missing email and password.');
				} catch (e) {
					setValid(false);
				}
			}}>
			<input
				id="email"
				autoFocus={true}
				autoComplete="on"
				className="border border-solid mb-2 px-1 py-1.5 rounded"
				placeholder="Email"
				type="text"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				id="password"
				className="border border-solid mb-2 px-1 py-1.5 rounded"
				placeholder="Password"
				type="password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			{!valid && (
				<div className="mb-2 text-red-600 text-sm">
					Invalid email or password!
				</div>
			)}
			<button
				type="submit"
				className="bg-pink-500 border-pink-500 border hover:bg-black hover:border hover:border-white hover:text-white p-1.5 rounded text-white text-center">
				Log in
			</button>
			<h3 className="text-center mt-10 mb-2 text-white">New to MyMusic?</h3>
			<Link
				to="/signup"
				className="border border-white hover:bg-pink-500 hover:text-white p-1.5 hover:border hover:border-pink-500 rounded text-white text-center">
				Sign Up
			</Link>
		</form>
	);
};
