import Client from '../../../api';

export const getAllServiceCategories = async (params?: string) => {
	try {
		const response = await new Client().user.services.service_category.getAll(
			params
		);
		if (response) return response;
	} catch (error) {
		console.log(error);
	}
};

export const getServiceCategoryById = async (params: string) => {
	try {
		const response = await new Client().user.services.service_category.getById(
			params
		);
		if (response) return response;
	} catch (error) {
		console.log(error);
	}
};

export const getAllServices = async (params: string) => {
	try {
		const response = await new Client().user.services.service.getAll(params);
		if (response) return response;
	} catch (error) {
		console.log(error);
	}
};

export const getServiceById = async (params: string) => {
	try {
		const response = await new Client().user.services.service.getById(params);
		if (response) return response;
	} catch (error) {
		console.log(error);
	}
};
