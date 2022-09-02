import Settingsform from '../components/Settingsform';
import { useContext } from 'react';
import { AppContext } from '../App.Context';

const Settings = () => {
	const { user } = useContext(AppContext);

	return (
		<div className="flex justify-center ">
			<div className="w-full max-w-md my-5 mx-2 sm:mx-0 border border-gray-300 p-8 rounded">
				<div className="">
					<h1 className="text-3xl mb-4 text-white">Current Login Details:</h1>
					<div className="text-white">
						email: <span className="text-pink-500">{user?.email}</span>{' '}
					</div>
					<div className="text-white">
						username: <span className="text-pink-500">{user?.username}</span>{' '}
					</div>
				</div>
				<h1 className="text-lg my-4  text-white">Update Account Details</h1>
				<Settingsform />
			</div>
		</div>
	);
};

export default Settings;
