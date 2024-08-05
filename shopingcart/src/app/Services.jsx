import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'http://localhost:3000/products'
});

axiosInstance.interceptors.request.use(
    res=>{return res},
    error=>{  return Promise.reject(error)
    })
export async function GetAllProducts()
{
    return await axiosInstance.get()
}

export async function GetSingleProduct(id)
{
    return await axiosInstance.get(`/${id}`)
}
export async function GetFilteredProducts(query)
{
    return await axiosInstance.get(`?query=${query}`)
}
