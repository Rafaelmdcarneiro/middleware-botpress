import axios from 'axios';

const env: any = {};
const workflow: any = {};
const user: any = {};
const event: any = {};

export const BotpressInline = {
	register: async () => {
		try {
			const registerBody = {
				action: 'register',
				parameters: {
					firstName: workflow.userName.first,
					lastName: workflow.userName.last,
					phone: workflow.userPhone,
					password: workflow.userPassword,
				},
			};

			const registerHeaders = {};

			const registerRequest = await axios.post(
				env.middleware_url,
				registerBody,
				{ headers: registerHeaders }
			);

			const data = registerRequest.data || null;

			if (registerRequest.status === 200 && data) {
				workflow.answer = data.messages.join(' ');

				user.userToken = data.parameters.auth_token;

				for (const key in data.parameters) {
					// this code checks whether the value of the parameter returned from the middleware is null and if it is, it becomes undefined
					workflow[key] =
						data.parameters[key] === null
							? undefined
							: data.parameters[key];
				}
			} else {
				throw new Error('Could not register user');
			}
		} catch (error: any) {
			workflow.errorOcurred = true;

			// this checks if the error contains a response and if it does, it returns the error custom message, otherwise it returns the error message from JavaScript
			if (error.response) {
				workflow.answer = error.response.data?.error;
			} else {
				workflow.answer = error.message;
			}
		}
	},

	login: async () => {
		try {
			const loginBody = {
				action: 'login',
				parameters: {
					phone: workflow.userPhone,
					password: workflow.userPassword,
				},
			};

			const loginHeaders = {};

			const loginRequest = await axios.post(
				env.middleware_url,
				loginBody,
				{ headers: loginHeaders }
			);

			const data = loginRequest.data || null;

			if (loginRequest.status === 200 && data) {
				workflow.answer = data.messages.join(' ');

				user.user_token = data.parameters.auth_token;

				for (const key in data.parameters) {
					// this code checks whether the value of the parameter returned from the middleware is null and if it is, it becomes undefined
					workflow[key] =
						data.parameters[key] === null
							? undefined
							: data.parameters[key];
				}
			} else {
				throw new Error('Could not login user');
			}
		} catch (error: any) {
			workflow.errorOcurred = true;

			// this checks if the error contains a response and if it does, it returns the error custom message, otherwise it returns the error message from JavaScript
			if (error.response) {
				workflow.answer = error.response.data?.error;
			} else {
				workflow.answer = error.message;
			}
		}
	},
};
