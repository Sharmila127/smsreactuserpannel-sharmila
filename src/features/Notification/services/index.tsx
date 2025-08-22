import Client from '../../../api';

export const getAllNotifications = async (data: any) => {
	try {
		const response = await new Client().user.notification.getAll(data);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const updateNotificationById = async (params: any) => {
	try {
		const response = await new Client().user.notification.update(params);
		if (response) return response;
	} catch (error) {
		console.log(error);
	}
};

export const getNotificationsByUser=async(params:string)=>{
    try{
        const response = await new Client().user.notification.getByUser(params)
        if(response) return response
    }catch(error){
         console.log('Error getting notifications by user:',error)
    }
}

export const markNotificationsAsRead = async(params:string)=>{
    try{
        const response = await new Client().user.notification.markAsRead(params)
        console.log(response)
        return response
    }catch(error){
         console.log('Error getting unread notifications counts:',error)
    }
}


export const markAllNotificationsAsRead =  async(params:string)=>{
    try{
        const response = await new Client().user.notification.MarkAllAsRead(params)
        console.log(response)
    }catch(error){
         console.log('Error getting unread notifications counts:',error)
    }
}