import { addMessageToResponse, addParameterToResponse } from '../utils/chatbot';
import { BotpressRequest, BotpressResponse } from '../types/botpress';

export async function avisarErro(
	_request: BotpressRequest,
	response: BotpressResponse
) {
	console.log(
		'[BOT-MIDDLEWARE]:[ACTIONS]:[avisarErro]: ⏳ WARNING ABOUT ERROR...'
	);

	addMessageToResponse(
		[
			`😥 I think I'm having technical problems...`,
			'Please let the responsible know if possible 🙏',
		],
		response
	);

	addParameterToResponse('errorOcurred', true, response);
}
