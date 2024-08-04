'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts} from "./Services"
import { setItems } from './redux/LoginSlice';
import 'animate.css';
import Swal from "sweetalert2"


export default function Home() {
  const [products,setProducts]=useState([])
     const router=useRouter()
    const user=useSelector(state=>state.login)
    const dispatch=useDispatch()
    const handleProductClick=(id)=>{
     router.push(`/${id}`)
    }
    const calculateItems=()=>{
        if(user.user){
            let cart=localStorage.getItem(user.user.uid)?localStorage.getItem(user.user.uid).split(','):[]
            let total=0
                for(let i=0; i<cart.length;i++){
                    if(cart[i]){
                        total+=parseInt(cart[i])
                    }
                }
                localStorage.setItem('items',total)
                dispatch(setItems(total))
        }
    }
    const handleAddToCart=(pid)=>{
        if(user.user)
        {
            let cart=localStorage.getItem(user.user.uid)?localStorage.getItem(user.user.uid).split(','):[]
            if(pid in cart)
                cart[pid]++;
            else 
                cart[pid]=1
            localStorage.setItem(user.user.uid,cart)
            calculateItems()
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
    useEffect(()=>{GetAllProducts().then(((response)=>{ setProducts(response.data)}))
    calculateItems()
    },[])
    

    return(
        <>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1  py-20 gap-2 container mx-auto "  >
            {   products.map((product,index)=>

                  <div key={index} className="animate__animated animate__fadeIn w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center relative py-20 mx-auto"  >
                    <img className="p-8 rounded-t-lg" src={product.image} alt="product image" onClick={()=>{handleProductClick(product.id)}} />            
                     <div className="px-5 pb-5 ">
                 <h5 className="lg:text-xs md:text-lg text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                 <div className="flex justify-center items-center  mt-2.5 mb-5">
                 <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3"></span>
                 </div>
                 

                 <div className="flex    items-center justify-center  absolute bottom-4 w-full gap-3">
                     <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{handleAddToCart(product.id)}}>Add to cart</button>
                 </div>
                 </div>
                </div> 
                

            )

            
            }   
            </div>         
        </>
    )
}
