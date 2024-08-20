'use client'
import { useEffect, useRef, useState } from "react"
import { GetSingleProduct } from "../../Services"
import { useDispatch, useSelector } from "react-redux"
import { setItems } from "../../redux/LoginSlice"
import 'animate.css';
import { useRouter } from "next/navigation"

function ShowCart()
{
   
    const [products,setProducts]=useState([])
    const dispatch=useDispatch()
    const user=useSelector(state=>state.login)
    const navigate=useRouter()
    const remove=(pid,index)=>
    {
        let cart=localStorage.getItem(user.user.uid).split(',')
        const qty=cart[pid]
        cart[pid]=0
        localStorage.setItem(user.user.uid,cart)
        let temp=products
        temp.splice(index,1)
        setProducts(temp)
        
        const total=parseInt(localStorage.getItem('items'))-parseInt(qty)
        localStorage.setItem('items',total)
        dispatch(setItems(total))
    }
     async function updateCart(){
        const cart=localStorage.getItem(user.user.uid)?localStorage.getItem(user.user.uid).split(','):[]
        const details=[]
        setProducts([])
        for(let i=0; i<cart.length;i++){
            let productObject={}
            if(cart[i]&&cart[i]!=0)
                await GetSingleProduct(i).then(res=>{productObject=res.data;productObject.qty=cart[i];details.push(productObject);})
            
        }
        setProducts(details)
        
        
        let total=0
            for(let i=0; i<cart.length;i++){
                if(cart[i]){
                    total+=parseInt(cart[i])
                }
            }
            localStorage.setItem('items',total)
            dispatch(setItems(total))
       
    }
    const increaseQty=(pid,price,index)=>
    {
        let cart=localStorage.getItem(user.user.uid).split(',')
        cart[pid]++
        localStorage.setItem(user.user.uid,cart)
        let temp =products
        temp[index].qty=cart[pid]
        setProducts(temp)
        const total=parseInt(localStorage.getItem('items'))+1
        localStorage.setItem('items',total)
        dispatch(setItems(total))
    }
    const decreaseQty=(pid,price,index)=>
    {
        let cart=localStorage.getItem(user.user.uid).split(',')
        cart[pid]--
        if(cart[pid]>=0){
        localStorage.setItem(user.user.uid,cart)
        let temp =products
        temp[index].qty=cart[pid]
        setProducts(temp)
        }
        const total=parseInt(localStorage.getItem('items'))-1
        localStorage.setItem('items',total)
        dispatch(setItems(total))
    }
    useEffect(()=>{
        updateCart()
    },[])
    return(
        <>
        {user.user &&products.length>0&&products.map((product,index)=>
        <>
        {parseInt(product.qty)>0&&
        <div key={index} className="animate__animated animate__fadeIn flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mx-auto my-20">
        <img className="object-cover w-100 rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={product.image} alt="" />
        <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
        <div className="flex gap-2">
        <button className=" items-center text-center rounded-md bg-pink-50 px-2 py-3 text-lg font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 h-12 w-10" onClick={()=>{decreaseQty(product.id,product.price,index)}}>-</button>
        <span className=" items-center text-center rounded-md bg-pink-50 px-2 py-3 text-lg font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 h-12 w-10" >{product.qty}</span>
        <button className=" items-center text-center rounded-md bg-pink-50 px-2 py-3 text-lg font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 h-12 w-10" onClick={()=>{increaseQty(product.id,product.price,index)}}>+</button>

        </div>
        
        <div className="flex    items-center justify-center  gap-4">
            <span className="text-xl font-bold text-gray-900 dark:text-white" >${product.price*(parseInt(localStorage.getItem(user.user.uid).split(',')[product.id]))}</span>
            <button className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800" onClick={()=>{remove(product.id,index)}}>Remove</button>
        </div>
        </div>
    </div>
        }
        </>
    )}
    {user.user && products.length==0&&
   
        <div className="animate__animated animate__fadeIn flex flex-col items-center justify-center my-20 ">
            <img
                    className="h-20 w-auto animate__animated animate__bounceInRight"
                    src="empty.svg"
                    alt="empty cart"
                  />
            <h1 className="text-3xl my-10">Your cart is empty</h1>
            <button className="btn bg-black text-white mt-6  px-4 py-2 text-2xl rounded" onClick={()=>{navigate.push('/')}}>Let&apos;s go shoping!</button>
        </div>
       
    }
        </>
    )
}
export default ShowCart