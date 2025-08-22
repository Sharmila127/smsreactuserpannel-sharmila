import Client from '../../api';

export const getSparePartsData = async (data: any) => {
	try {
		const response = await new Client().user.spare_parts.getAll(data);
		if (response) return response;
	} catch (error) {
		console.error('Error fetching spare parts:', error);
	}
};

export const postSparePartsData = async (data: any) => {
	try {
		const response = await new Client().user.booking_cart.post(data);
		if (response) return response;
	} catch (error) {
		console.error('Error posting spare parts:', error);
	}
};

export const getBookingCartData = async (data: string) => {
	try {
		const response = await new Client().user.booking_cart.getAll(data);
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
};
