import axios from "axios"
import { baseURI } from "../config"
import MessageSchema from "../types/message";
export const sendMessageRequest = async(userText: string) => {
    try {
        const response = await axios.post(`${baseURI}/chat`, { 
            userText 
        }, {
            headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        return  response.data.response as string;
    } catch (error) {
        throw error;
    }
}