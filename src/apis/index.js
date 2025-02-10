import axios from "axios";
import { toast } from "react-toastify";
import API_ROOT from "~/utils/constants";

//User
export const registerUserAPI = async (data) => {
    const response = await axios.post(`${API_ROOT}/auth/register`, data);
    toast.success(response.data.message);
    return response.data;
};

export const loginUserAPI = async (data) => {
    const response = await axios.post(`${API_ROOT}/auth/login`, data);
    toast.success(response.data.message);
    return response.data;
};

//Product
export const fetchLatestProductAPI = async () => {
    const response = await axios.get(`${API_ROOT}/homepage/latest-product`);
    return response.data;
};
export const fetchBestSellerProductAPI = async () => {
    const response = await axios.get(`${API_ROOT}/homepage/best-seller`);
    return response.data;
};

export const fetchAllProductAPI = async () => {
    const response = await axios.get(`${API_ROOT}/product/get-all-product`);
    console.log(response.data);
    return response.data;
};
