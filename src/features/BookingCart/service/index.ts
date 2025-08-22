import Client from '../../../api';

export const booking_cart = async (data: any) => {
	try {
		const response = await new Client().user.booking_cart.getAll(data);
		return response;
	} catch (error: any) {
		console.error(
			'Error fetching booking cart:',
			error?.response || error?.message || error
		);
		return null;
	}
};

export const postBookingProduct = async (params: any) => {
	try {
		const response = await new Client().user.bookings.postProduct(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.error('Error in postBookingProduct:', error);
		throw error;
	}
};

export const deleteBookingCartProduct = async (params: any) => {
	try {
		const response = await new Client().user.booking_cart.deleteProduct(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.error('Error in deleteBookingProduct:', error);
		throw error;
	}
};

export const deleteBookingCartService = async (params: any) => {
	try {
		const response = await new Client().user.booking_cart.deleteService(params);
		if (response) {
			return response;
		}
	} catch (error) {
		console.error('Error in deleteBookingService:', error);
		throw error;
	}
};
