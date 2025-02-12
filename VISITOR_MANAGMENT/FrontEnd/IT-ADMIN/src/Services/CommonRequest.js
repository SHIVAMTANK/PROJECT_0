import axios from "axios";

export const commonrequest = async(methods,url,body,headers={}, queryParams={})=>{
    let config = {
        method:methods,
        url,
        headers: Object.keys(headers).length > 0 ? {...headers } : { "Content-Type": "application/json" },
        data:body,
        params: queryParams
    }

    // axios call and handling response
    return axios(config).then((data)=>{
        return data
    }).catch((error)=>{
        return error.response
    })
}