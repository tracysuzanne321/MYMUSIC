import { useState, useContext } from 'react';
import { AppContext } from '../App.Context';
import { createUser } from '../utils';
import { useNavigate } from 'react-router-dom';

export const Signupfor = () => {
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [username, setUsername] = useState<string>();
	const [valid, setValid] = useState(true);
	const navigate = useNavigate();
	const { setUser } = useContext(AppContext);

	return (
		<form
			className="flex flex-col  "
			onSubmit={async (e) => {
				e.preventDefault();
				try {
					if (email && password && username) {
						const userData = await createUser(username, email, password);
						setUser(userData!);
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
				id="username"
				autoFocus={true}
				autoComplete="on"
				className="border border-solid mb-2 px-1 py-1.5 rounded"
				placeholder="Username"
				type="text"
				onChange={(e) => setUsername(e.target.value)}
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
				className="bg-pink-500 border border-pink-500 hover:bg-black hover:border hover:border-white p-1.5 rounded text-white">
				Sign up
			</button>
		</form>
	);
};
