import Client from '../../../api';

export const getUserProfile = async (data: any) => {
	try {
		const response = await new Client().user.auth.getUserProfile(data);
		if (response) return response;
	} catch (error) {
		console.error('Error fetching user profile:', error);
	}
};

export const updateUserProfile = async (data: any) => {
	try {
		const response = await new Client().user.auth.updateUserProfile(data);
		if (response) return response;
	} catch (error) {
		console.error('Error updating user profile:', error);
	}
};
