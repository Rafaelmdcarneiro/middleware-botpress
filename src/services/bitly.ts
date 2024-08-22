import axios from 'axios';

export const bitly = axios.create({
	baseURL: 'https://api-ssl.bitly.com/v4',
});

bitly.defaults.headers.common[
	'Authorization'
] = `Bearer ${process.env.BITLY_TOKEN}}`;

bitly.defaults.headers.common['Content-Type'] = 'application/json';

export interface ShortenLinkSuccessResponse {
	references: any;
	link: string;
	id: string;
	long_url: string;
	archived: boolean;
	created_at: string;
	custom_bitlinks: string[];
	tags: string[];
	deeplinks: [
		{
			guid: string;
			bitlink: string;
			app_uri_path: string;
			install_url: string;
			app_guid: string;
			os: string;
			install_type: string;
			created: string;
			modified: string;
			brand_guid: string;
		}
	];
}
