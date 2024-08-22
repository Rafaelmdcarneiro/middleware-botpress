import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import { BotpressResponse } from '../types/botpress';

dotenv.config();

export function showDivider() {
	return `\- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \-`;
}

export function addMessageToResponse(
	message: string | string[],
	response: BotpressResponse
) {
	Array.isArray(message)
		? message.map((submessage) => {
				response!.messages.push(submessage);
		  })
		: response!.messages.push(message);
}

export function addParameterToResponse(
	key: string,
	value: any,
	response: BotpressResponse
) {
	response.parameters[key] = value;
}

export function addEntriesToObjectInResponse(
	key: string,
	value: any,
	response: BotpressResponse
) {
	response!.parameters[key] = {
		...(response!.parameters[key] || {}),
		...value,
	};
}

export function handleError(error: any): string {
	try {
		let errorString = '';

		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<{
				message: string;
				error: any;
				[key: string]: any;
			}>;

			if (!axiosError.response) {
				errorString = '💤 The server is offline';
			} else {
				errorString = axiosError.response.data.error
					? axiosError.response.data.error
					: String(error);
			}
		} else {
			errorString = error.message || String(error);
		}

		return errorString;
	} catch (error) {
		console.log(
			`[BOT-MIDDLEWARE]:[UTILS]:[handleError]: ERROR WHILE HANDLING ERROR : ${error}`
		);

		return 'Could not show error...';
	}
}
