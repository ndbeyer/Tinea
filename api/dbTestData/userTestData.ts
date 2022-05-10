export type UserData = {
	email: string;
	password: string;
	created_at: string;
	confirmation_code: string;
	email_confirmed: string;
}[];

const baseObject = {
	password: '$2b$10$Se1pjK7Fun3v3cJz0si3Oed7YBYYVHCxcNwiB23g6pIpgqSHLLkUW',
	created_at: '$$now()',
	updated_at: '$$now()',
	terms_accepted_at: '$$now()',
	confirmation_code: '123456',
	email_confirmed: '$$true',
};

const userTestData: UserData = [
	{
		// id: 1,
		email: 'testuser1@gmail.com',
	},
	{
		// id: 2,
		email: 'testuser2@gmail.com',
	},
].map((obj) => ({ ...baseObject, ...obj }));

export default userTestData;
