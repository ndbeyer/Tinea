import User from './classes/User';

import login from './mutations/login';
import register from './mutations/register';
import confirmEmail from './mutations/confirmEmail';
import refreshLogin from './mutations/refreshLogin';

const resolvers = {
	Query: {
		currentUser: async (_, __, context) => {
			console.log('currentUser query context: ', context);
			return await User.gen({ id: context.viewer.userId });
		},
	},
	Mutation: {
		login,
		register,
		confirmEmail,
		refreshLogin,
	},
};

export default resolvers;
