import { Signupfor } from '../components/Signupform';

const Signup = () => {
	return (
		<div className="flex justify-center ">
			<div className="w-full max-w-md mt-16 mx-2 sm:mx-0 border border-gray-300 p-8 rounded">
				<h1 className="mb-4 text-xl text-white">Create a MyMusic account</h1>
				<Signupfor />
			</div>
		</div>
	);
};

export default Signup;
