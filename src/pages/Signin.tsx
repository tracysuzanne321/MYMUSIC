import { LogInForm } from '../components/Loginform';

const Signin = () => {
	return (
		<div className="flex justify-center   ">
			<div className="w-full max-w-md mt-16 mx-2 sm:mx-0 border border-gray-300 p-8 rounded">
				<h1 className="mb-4 text-xl text-white">Sign in to your account</h1>
				<LogInForm />
			</div>
		</div>
	);
};

export default Signin;
