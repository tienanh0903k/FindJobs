import axiosClient from "./axiosClient"

const messApi = {
    getConversationClient: (senderId: any, receiveId: any) => {
        //console.log(process.env.NEXT_PUBLIC_BACKEND); // Kiểm tra xem URL có đúng không
       return axiosClient.get(`http://localhost:3001/api/message/conversation?sender_id=${senderId}&receive_id=${receiveId}`);
    }        


}
export default messApi;
