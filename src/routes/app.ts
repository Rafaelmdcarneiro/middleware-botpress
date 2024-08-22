import { BotpressRequest, BotpressResponse } from '../types/botpress';
import { fallback } from '../actions/fallback';
import { handleError } from '../utils/chatbot';
import { login } from '../actions/login';
import { register } from '../actions/register';
import { Request, Response } from 'express';

export async function AppRouter(req: Request, res: Response) {
	const request: BotpressRequest = req.body;

	console.log('[BOT-MIDDLEWARE]:[app]: 💬 REQUEST.BODY: ', request);

	const response: BotpressResponse = {
		messages: [],
		parameters: {},
	};

	if (!request || !request.action) {
		return res.status(400).send('Bad Request');
	}

	try {
		const action = request.action;

		if (action === 'login') {
			await login(request, response);
		} else if (action === 'register') {
			await register(request, response);
		} else {
			await fallback(request, response);
		}

		console.log(
			`[BOT-MIDDLEWARE]:[app]: ✅ ACTION ${request.action.toUpperCase()} SUCCESSFULLY EXECUTED`
		);

		console.log('[BOT-MIDDLEWARE]:[app]: 💬 ANSWER : ', response);

		res.status(200).send(response);
	} catch (error: any) {
		console.log(
			`[BOT-MIDDLEWARE]: ❌ ERROR WHILE EXECUTING ACTION ${
				request.action
			} : ${handleError(error)}`
		);

		console.log('[BOT-MIDDLEWARE]:[app]: 💬 RESPOSTA : ', {
			error: handleError(error),
		});

		res.status(400).send({
			error: handleError(error),
		});
	}
}
