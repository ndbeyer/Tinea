import jwt from 'jsonwebtoken';
import CONSTS from '../consts';
import type { LoginJWT, Viewer } from '../typescript-types';

export const validateJWT = (jwtToken?: string): LoginJWT | null => {
	try {
		const data = jwt.verify(jwtToken, CONSTS.API_JWT_SECRET) as LoginJWT;
		return data;
	} catch (e) {
		return null;
	}
};

export const createViewerFromJwt = (jwtToken?: string): Viewer => {
	const decodedJWT = validateJWT(jwtToken);
	const viewer = {
		userId: decodedJWT?.userId,
	};
	return viewer;
};

export const createJwt = (payload: any): string => {
	const token = jwt.sign(payload, CONSTS.API_JWT_SECRET, {
		expiresIn: '1 hour',
	});
	return token;
};
