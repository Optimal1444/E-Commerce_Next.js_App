'use client'
import { GetSingleProduct } from "../../Services"
import { useEffect, useState } from "react"
import { setItems } from "../../redux/LoginSlice"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
function Product({params})
{
    const [product,setProduct]=useState({})
    const dispatch=useDispatch()
    const user=useSelector(state=>state.login)
    const id=params.productId
    useEffect(()=>{
      GetSingleProduct(id).then(res=>res.data).then(data=>{setProduct(data)})
    },[])
   
    const handleAddToCart=(pid)=>{
        if(user.user)
        {
            let cart=localStorage.getItem(user.user.uid)?localStorage.getItem(user.user.uid).split(','):[]
            if(pid in cart)
                cart[pid]++;
            else 
                cart[pid]=1
            localStorage.setItem(user.user.uid,cart)
            let total=0
            for(let i=0; i<cart.length;i++){
                if(cart[i]){
                    total+=parseInt(cart[i])
                }
            }
            localStorage.setItem('items',total)
            dispatch(setItems(total))
            Swal.fire({
                position: "top-middle",
                icon: "success",
                title: 'added',
                showConfirmButton: false,
                width:'16em',
                height:'4em',
                timer: 500
              });
        }
        else
        Swal.fire({
            title: "Sign-up for free",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
    }
    return(
        <>
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mx-auto my-20">
        <img className="object-cover w-100 rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={product.image} alt="" />
        <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
        <div className="flex    items-center justify-center  gap-4">
                     <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{handleAddToCart(product.id)}}>Add to cart</button>
        </div>
        </div>
    </div>
        </>
    )
}
export default Product