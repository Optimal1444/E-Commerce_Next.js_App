import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'http://localhost:3000/',
});

axiosInstance.interceptors.request.use(
    res=>{return res},
    error=>{  return Promise.reject(error)
    })
export async function GetAllProducts()
{
    return await axiosInstance.get('products')
}

export async function GetSingleProduct(id)
{
    return await axiosInstance.get(`products/${id}`)
}
export async function GetFilteredProducts(query)
{
    return await axiosInstance.get(`products?query=${query}`)
}
export async function checkUser(body)
{
    return await axiosInstance.post(`users`,body)
}
export async function createUser(body)
{
    return await axiosInstance.post(`users/user`,body)
}
export async function updateUser(body)
{
    return await axiosInstance.put(`users/user`,body)
     
}