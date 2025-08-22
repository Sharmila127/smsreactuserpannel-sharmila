import Client from '../../api';

export const getHomeData =async (data :any)=>{
    try{
        const response =await new Client().user.spare_parts.getAll(data);
        return response;
    }catch(error){
        console.error("Error fetching home data:", error);
    }
}

// export const getHomeServicesData =async (data :any)=>{
//     try{
//         const response = await new Client().user.services.service_category.getAll(data);
//         return response;
//     }catch(error){
//         console.error("Error fetching home data:", error);
//     }
// }