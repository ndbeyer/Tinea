import User from './classes/User';

import login from './mutations/login';
import register from './mutations/register';
import confirmEmail from './mutations/confirmEmail';
import refreshLogin from './mutations/refreshLogin';
import Pharmaceutical from './classes/Pharmaceutical';
import updateUserStatus from './mutations/updateUserStatus';

const resolvers = {
	Query: {
		currentUser: async (_, __, context) => {
			console.log('currentUser query context: ', context);
			return await User.gen({ id: context.viewer.userId });
		},
		pharmaceutical: async (_, { id }) => {
			return await Pharmaceutical.gen({ id });
		},
		pharmaceuticals: async (_, { ids }) => {
			return await Pharmaceutical.genMult({ ids });
		},
	},
	Mutation: {
		login,
		register,
		confirmEmail,
		refreshLogin,
		updateUserStatus,
	},
};

export default resolvers;
