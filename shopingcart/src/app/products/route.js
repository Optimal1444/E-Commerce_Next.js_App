import {products} from './data' 
export async function GET(request) {
    return Response.json(products)
}
