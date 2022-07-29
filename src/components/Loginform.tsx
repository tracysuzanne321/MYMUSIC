import { useState } from 'react';
import { Link } from 'react-router-dom';

export const LogInForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [valid, setValid] = useState(true);

	return (
		<form
			className="flex flex-col  "
			onSubmit={async (e) => {
				e.preventDefault();
				try {
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
				className="bg-pink-500 hover:bg-black p-1.5 rounded text-white">
				Log in
			</button>
			<h3 className="text-center mt-10 mb-2">New to MyMusic?</h3>
			<Link
				to="/signup"
				className="border border-pink-500 hover:bg-pink-500 hover:text-white p-1.5 rounded text-pink-500 text-center">
				Sign Up
			</Link>
		</form>
	);
};
