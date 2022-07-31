import Settingsform from '../components/Settingsform';
import { useContext } from 'react';
import { AppContext } from '../App.Context';

const Settings = () => {
	const { user } = useContext(AppContext);

	return (
		<div className="flex justify-center ">
			<div className="w-full max-w-md mt-16 mx-2 sm:mx-0 border border-gray-300 p-8 rounded">
				<div className="mb-4">
					<h1 className="text-3xl mb-4 text-white">Current Login Details:</h1>
					<div className="text-white">email: {user!.email}</div>
					<div className="text-white">username: {user!.username}</div>
				</div>
				<h1 className="text-3xl mb-4">User Account</h1>
				<Settingsform />
			</div>
		</div>
	);
};

export default Settings;
