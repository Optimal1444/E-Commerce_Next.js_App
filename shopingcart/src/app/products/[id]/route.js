import {products} from '../data' 
export async function GET(request,{params}) {
    const product=products.find((product)=>product.id==parseInt(params.id))
    return Response.json(product)
}
