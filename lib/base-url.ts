import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const chatApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CHAT_API_URL,
});

export { api, chatApi };
