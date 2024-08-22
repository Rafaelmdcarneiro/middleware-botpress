import { authService } from '../services/auth';
import { BotpressResponse, LoginRequest } from '../types/botpress';
import {
	addMessageToResponse,
	addParameterToResponse,
	handleError,
} from '../utils/chatbot';

export async function login(request: LoginRequest, response: BotpressResponse) {
	try {
		console.log('[BOT-MIDDLEWARE]:[ACTIONS]:[login]: ⏳ LOGIN STARTED');

		const { phone, password } = request.parameters;

		const doLogin = await authService.login(phone, password);

		if (!doLogin || !doLogin.user || !doLogin.token) {
			throw new Error('Could not log user in...');
		}

		const { token, user } = doLogin;

		addMessageToResponse(
			`👋 Hi ${user.name}, good to see you again!`,
			response
		);

		addParameterToResponse('authToken', token, response);
		addParameterToResponse('userName', user.name, response);

		console.log('[BOT-MIDDLEWARE]:[ACTIONS]:[login]: ✅ LOGIN SUCCESSFUL');
	} catch (error: any) {
		console.log(
			`[BOT-MIDDLEWARE]:[ACTIONS]:[login]: ❌ ERROR WHILE LOGGING IN : `,
			handleError(error)
		);

		throw error;
	}
}
