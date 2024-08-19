import { NextResponse } from 'next/server';
import query from '../../lib/db'
export async function GET(request,{params}) {
        const products=await query('select * from products where id=?',[params.id])
       // const product=products.find((product)=>product.id==params.id)
        return Response.json(products[0])
}
export async function DELETE(request,{params}) {
        try {
          await query('delete from products where id=?',[params.id])
          return NextResponse.json({ Message: "No Content", status: 204 });
        }
        catch (error) {
          console.log("Error occured ", error);
          return NextResponse.json({ Message: "Failed", status: 500 });
        }
      }