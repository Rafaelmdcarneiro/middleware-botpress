export interface BotpressRequest {
	action: string;
	authToken?: string;
	parameters: any;
	// typed as any but the format should be { [key: string]: any }
}

export interface BotpressResponse {
	messages: string[];
	parameters: {
		[key: string]: any;
	};
}

export interface RegisterRequest extends BotpressRequest {
	parameters: {
		firstName: string;
		lastName: string;
		phone: string;
		password: string;
	};
}

export interface LoginRequest extends BotpressRequest {
	parameters: {
		phone: string;
		password: string;
	};
}
