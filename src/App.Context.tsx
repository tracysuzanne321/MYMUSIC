import { createContext } from 'react';
import { userContextType } from './typings';

export const AppContext = createContext<userContextType>({
	setUser: () => {},
	user: {
		email: '',
		id: '',
	},
});
