import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AppContext } from '../App.Context';
import { updateUser, deleteUser, logOut } from '../utils';

const Settingsform = () => {
	const [valid, setValid] = useState(true);
	const { setUser } = useContext(AppContext);
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	return (
		<>
			<form
				className="flex flex-col"
				onSubmit={async (e) => {
					e.preventDefault();
					try {
						const userData = await updateUser(username, email, password);
						setUser(userData);
						navigate('/');
					} catch (e) {
						console.log(e);
						setValid(false);
					}
				}}>
				<input
					id="email"
					autoFocus={true}
					autoComplete="on"
					className="border border-solid mb-2 px-1 py-1.5 rounded"
					placeholder="Email"
					type="email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					id="username"
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
						Invalid username, email or password!
					</div>
				)}
				<button
					type="submit"
					className="bg-pink-500 hover:bg-pink-700 p-1.5 rounded text-white mt-4">
					Update User Settings
				</button>
			</form>
			<button
				onClick={async () => {
					const result = await deleteUser();
					if (result.message === 'success') {
						await logOut();
						setUser({
							username: '',
							email: '',
						});
						navigate('/');
					}
				}}
				className="bg-pink-500 hover:bg-pink-700 p-1.5 rounded text-white mt-4 w-full">
				Delete User
			</button>
		</>
	);
};

export default Settingsform;
