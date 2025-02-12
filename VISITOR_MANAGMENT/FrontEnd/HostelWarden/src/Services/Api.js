import Cookies from "js-cookie";
import { commonrequest } from "./CommonRequest";
import { BACKEND_URL } from "./Helpers";

const user = JSON.parse(Cookies.get('user') || null);

export const postRequest = async (endpoint, data, headers = {}, params = {}) => {
    // console.log('data', data);
    try {
        const response = await commonrequest("POST", `${BACKEND_URL}/${endpoint}`, data, headers, params);
        return response;
    } catch (error) {
        throw new Error(`Error in POST request to ${endpoint}`);
    }
};

export const postRequestWithToken = async (endpoint, data, headers = {}, params = {}) => {
    const token = Cookies.get('token');
    if (!token) {
        throw new Error('No token found');
    }
    headers['Authorization '] = token;
    // headers['Content-Type'] = 'application/json';
    try {
        const response = await commonrequest("POST", `${BACKEND_URL}/${endpoint}`, data, headers, params);
        return response;
    } catch (error) {
        throw new Error(`Error in POST request to ${endpoint}`);
    }
}

export const getRequest = async (endpoint, params = {}) => {
    try {
        const response = await commonrequest("GET", `${BACKEND_URL}/${endpoint}`, {}, {}, params);
        return response;
    } catch (error) {
        throw new Error(`Error in GET request to ${endpoint}`);
    }
}

export const getRequestWithToken = async (endpoint, params = {}) => {
    const token = Cookies.get('token');
    if (!token) {
        alert('Please login to access this page');
        window.location.href = `/home`;
        // throw new Error('No token found');
    }
    const headers = {};
    headers['Authorization '] = token;
    headers['Content-Type'] = 'application/json';

    try {
        const response = await commonrequest("GET", `${BACKEND_URL}/${endpoint}`, {}, headers, params);
        return response;
    } catch (error) {
        throw new Error(`Error in GET request to ${endpoint}`);
    }
};
