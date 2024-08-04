import axios from "axios";

export async function GetAllProducts()
{
    return await axios.get('http://localhost:3000/products')
}

export async function GetSingleProduct(id)
{
    return await axios.get(`http://localhost:3000/products/${id}`)
}
