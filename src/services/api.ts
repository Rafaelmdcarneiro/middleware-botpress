import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

function createApiInstance(): AxiosInstance {
	const api = axios.create({
		baseURL: process.env.SERVER_URL,
	});

	api.defaults.headers.common['Authorization'] = process.env.AUTH_KEY || '';

	return api;
}

export const api = createApiInstance();
