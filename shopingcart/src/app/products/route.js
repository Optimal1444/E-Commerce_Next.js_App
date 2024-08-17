import query from '../lib/db'
export async function GET(request) {
        const products=await query('select * from products')
        const queryParameter=request.nextUrl.searchParams.get("query")
        const filteredProducts=queryParameter?products.filter(product=>product.description.includes(queryParameter)):products
        return Response.json(filteredProducts)
}
