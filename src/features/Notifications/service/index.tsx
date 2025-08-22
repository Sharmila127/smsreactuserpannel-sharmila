import Client from '../../../api';

export const getAllNotifications = async (data: string) => {
	try {
		const response = await new Client().user.notification.getAll(data);
		return response;
	} catch (error) {
		console.log(error);
	}
};
