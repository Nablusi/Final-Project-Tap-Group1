import axios from "axios";
import { urls } from "../../config/urls";
import { getToken } from "./getToken";

export const getCartId = async (id) => {
    try {
        const sendData = await axios.get(`${urls.isCartExist}/${id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        if (Array.isArray(sendData.data) && sendData.data.length > 0) {
            return sendData.data[0];
        } else {
            throw new Error("Cart data or id is missing");
        }
    } catch (e) {
        console.log('Error occurred while fetching cart data:', e);
        throw e;
    }
}
