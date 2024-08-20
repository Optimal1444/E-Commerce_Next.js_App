import query from '../lib/db'
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export async function GET(request) {
        const products=await query('select * from products')
        const queryParameter=request.nextUrl.searchParams.get("query")
        const filteredProducts=queryParameter?products.filter(product=>product.description.includes(queryParameter)):products
        return Response.json(filteredProducts)
}
export async function POST(request) {
        const formData = await request.formData();
        const file = formData.get("file");
        const title = formData.get("title");
        const price = formData.get("price");
        const des = formData.get("des");
        const cat = formData.get("cat");
        let filename='image-regular.svg'
        
        
        try {
          if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            filename = Date.now() + file.name.replaceAll(" ", "_");
            console.log(filename);
            await writeFile(
              path.join(process.cwd(), "public/uploads/" + filename),
              buffer
            );
          }
          const res=await query('insert into products (title,price,category,description,image) values (? , ?, ? , ? , ? ) '
        ,[title,price,cat,des,`uploads/${filename}`]  )
    
          return NextResponse.json({ Message: "Success", status: 201 });
        } catch (error) {
          console.log("Error occured ", error);
          return NextResponse.json({ Message: "Failed", status: 500 });
        }
}
export async function PUT(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const title = formData.get("title");
  const price = formData.get("price");
  const des = formData.get("des");
  const cat = formData.get("cat");
  const id=formData.get("id")

  try {
    console.log(file)
    if(file){
      
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + file.name.replaceAll(" ", "_");
    
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );
  
    const res=await query('update products set title = ?, price = ?, category =? ,description = ?, image= ? where id=?  '
      ,[title,price,cat,des,`uploads/${filename}`,id]  )
    }
    else{
      const res=await query('update products set title = ?, price = ?, category =? ,description = ? where id=?  '
  ,[title,price,cat,des,id]  )
    }
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
