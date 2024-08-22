import { api } from './api';
import { handleError } from '../utils/chatbot';

export const authService = {
	async login(
		phone: string,
		password: string
		// acceptedTerms?: boolean
	): Promise<{ token: string; user: any }> {
		try {
			console.log('[BOT-MIDDLEWARE]:[SERVICE]:[auth]:[login]: INICIADA');

			const loginBody = {
				phone,
				password,
			};

			const loginRequest = await api.post(
				'https://your-api-url.com',
				loginBody
			);

			const data = loginRequest.data || null;

			if (!data.token || !data.user) {
				throw new Error('Could not log user in...');
			}

			return {
				token: data.token,
				user: data.user,
			};
		} catch (error) {
			console.log(
				'[BOT-MIDDLEWARE]:[SERVICE]:[auth]:[login]: ERROR WHILE LOGGING IN',
				handleError(error)
			);

			throw error;
		}
	},
};
