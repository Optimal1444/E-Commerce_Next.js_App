import {products} from './data' 
export async function GET(request) {
    const query=request.nextUrl.searchParams.get("query")
    const filteredProducts=query?products.filter(product=>product.description.includes(query)):products
    return Response.json(filteredProducts)
}
