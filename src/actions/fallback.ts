import { BotpressRequest, BotpressResponse } from '../types/botpress';

export async function fallback(
	request: BotpressRequest,
	_response: BotpressResponse
) {
	console.log(
		"[BOT-MIDDLEWARE]:[ACTIONS]:[fallback]: ❌ NO FUNCTIONS TO THE ACTION '",
		request.action,
		"'"
	);

	throw new Error(
		`ℹ️ THE ACTION ${request.action} IS DISCONNECTED... PLEASE NOTIFY THE RESPONSIBLE 🙏`
	);
}
