import {products} from '../data' 
export async function GET(request,{params}) {
    const product=products.find((product)=>product.id==params.id)
    return Response.json(product)
}
