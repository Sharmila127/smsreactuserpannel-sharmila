import Client from '../../api';

export const getOfferData =async ()=>{
    try{
        const response =await new Client().user.offer.getAll();
        return response;
    }catch(error){
        console.error("Error fetching Offer data:", error);
    }
}