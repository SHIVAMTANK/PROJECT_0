import axios from "axios";

export const commonrequest = async(methods, url, body, headers = {}) => {
    console.log('Making request to:', url);
    console.log('With headers:', headers);
    
    const config = {
        method: methods,
        url,
        headers: headers,
        data: body
    };

    return axios(config)
        .then((data) => {
            console.log('Success response:', data);
            return data;
        })
        .catch((error) => {
            console.error('Request failed:', error.response || error);
            return error.response;
        });
}