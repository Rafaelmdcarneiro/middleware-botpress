import { api } from '../services/api';
import { authService } from '../services/auth';
import { BotpressResponse, RegisterRequest } from '../types/botpress';
import {
	addMessageToResponse,
	addParameterToResponse,
	handleError,
} from '../utils/chatbot';

export async function register(
	request: RegisterRequest,
	response: BotpressResponse
) {
	try {
		console.log(
			'[BOT-MIDDLEWARE]:[ACTIONS]:[REGISTER]: ⏳ CREATING ACCOUNT...'
		);

		const { firstName, lastName, phone, password } = request.parameters;

		const registerUserBody = {
			firstName,
			lastName,
			phone,
			password,
		};

		const registerUserRequest = await api.post(
			'https://your-api-url.com',
			registerUserBody
		);

		if (!registerUserRequest.data.user) {
			throw new Error('Could not register user');
		}

		const { user } = registerUserRequest.data;

		addMessageToResponse(
			`✅ Alright ${user.firstName}, I created your account!`,
			response
		);

		addParameterToResponse('accountWasCreated', true, response);

		console.log(
			'[BOT-MIDDLEWARE]:[CONTROLLER]:[REGISTER]: ✅ ACCOUNT CREATED'
		);

		// TRIES TO LOGIN
		try {
			const login = await authService.login(phone, password);

			if (!login.token) {
				throw new Error('Could not log user in...');
			}

			addParameterToResponse('authToken', login.token, response);

			console.log(
				'[BOT-MIDDLEWARE]:[CONTROLLER]:[REGISTER]: ✅ LOGGED IN AFTER CREATING ACCOUNT'
			);
		} catch (error) {
			console.log(
				'[BOT-MIDDLEWARE]:[CONTROLLER]:[REGISTER]: ⚠️ ERROR WHILE LOGGING IN AFTER CREATING ACCOUNT',
				error
			);
		}
	} catch (error: any) {
		console.log(
			`[BOT-MIDDLEWARE]:[CONTROLLER]:[REGISTER]: ❌ ERROR WHILE CREATING ACCOUNT : `,
			handleError(error)
		);

		throw error;
	}
}
