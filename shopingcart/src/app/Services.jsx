import axios from "axios";

export async function GetAllProducts()
{
    return await axios.get('http://localhost:3001/products')
}

export async function GetSingleProduct(id)
{
    return await axios.get(`http://localhost:3001/products/${id}`)
}
