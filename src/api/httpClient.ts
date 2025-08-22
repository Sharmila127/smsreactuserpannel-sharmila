import axios from 'axios';
import { GetLocalStorage } from '../utils/localStorage';

const backEndUrl: string = import.meta.env.VITE_PUBLIC_API_URL

const Axios = axios.create({
	baseURL: backEndUrl,

	timeout: 50000000,
	headers: {
		'Content-Type': 'application/json',
	},
});

Axios.interceptors.request.use((config) => {
	// const token = localStorage.getItem('authToken');
	const token = GetLocalStorage('authToken')

	if (token) {
		config.headers['Authorization'] = `${token ? token : ''}`;
	}
	return config;
});

class HttpClient {
	async get(url: string, params?: string) {
		const response: unknown = await Axios.get(url, {
			params: params,
			headers: {},
		});
		return response;
	}

	async post(url: string, data: any) {
		const response: unknown = await Axios.post(url, data, {
			headers: {},
		});
		return response;
	}

	async update(url: string, data: string, params?: string) {
		const response = await Axios.put(url, data, {
			params: params,
			headers: {},
		});
		return response?.data;
	}

	async patch(url: string, params?: string, data?: string) {
		const response = await Axios.patch(url, data, {
			params: params,
			headers: {},
		});
		return response?.data;
	}

	async delete(url: string, params?: string) {
		const response = await Axios.delete(url, { params: params });
		return response?.data;
	}

	async fileGet(url: string, params?: any) {
		const response = await Axios.get(url, {
			params,
			responseType: 'blob',
			headers: {},
		});
		return response;
	}

	async uploadFile(url: string, data: string) {
		const response = await Axios.post(url, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response;
	}
}

export default new HttpClient();
