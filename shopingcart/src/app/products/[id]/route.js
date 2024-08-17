import query from '../../lib/db'
export async function GET(request,{params}) {
        const products=await query('select * from products')
        const product=products.find((product)=>product.id==params.id)
        return Response.json(product)
}
