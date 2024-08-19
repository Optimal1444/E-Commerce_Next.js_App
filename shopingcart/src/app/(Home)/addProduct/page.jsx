'use client'

import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { addProduct, deleteProduct, GetSingleProduct, updateProduct } from "../../Services"
import { useRouter, useSearchParams } from "next/navigation"
import Swal from "sweetalert2"
function AddProduct(){
    const id=useSearchParams().get('id')
    const user=useSelector(state=>state.login)
    const [product,setProduct]=useState()
    const [file,setFile]=useState()
    const catRef=useRef()
    const titleRef=useRef()
    const priceRef=useRef()
    const desRef=useRef()
    const router=useRouter()
    const [saveAlert,setSaveAlert]=useState()
    const handleSubmission=()=>{
        const formData = new FormData();
        if(file)
          formData.append('file', file);
        formData.append('title', titleRef.current.value);
        formData.append('cat', catRef.current.value);
        formData.append('price', priceRef.current.value);
        formData.append('des', desRef.current.value);
        if(id)
          formData.append('id', id);
        let res=null
        
        if(id)
         res= updateProduct(formData)
      else
        res= addProduct(formData)
        res.then(
          function(value) {
            setSaveAlert(1)
            setTimeout(() => {
              setSaveAlert(2)
            }, 3000);
          },
          function(error) {
             setSaveAlert(0)
             setTimeout(() => {
              setSaveAlert(2)
            }, 3000);
            }
        );
        
    }
    const handleDelete=(id)=>{
      
        deleteProduct(id).then((res)=>{
          Swal.fire({
            position: "top-middle",
            icon: "success",
            title: 'added',
            showConfirmButton: false,
            width:'16em',
            height:'4em',
            timer: 500
          });
          router.replace('/')
        })
    }
    useEffect(()=>{
      setSaveAlert(2)
      GetSingleProduct(id).then((res)=>res.data).then(data=>{setProduct(data)})
    
    },[])
    return(
        <>
        {user.user&&user.user.is_admin!=0&&

<div className="space-y-12 container mx-auto w-1/2 border border-4 border-orange-100 px-10 rounded-2xl my-4">
  <div className="border-b border-gray-900/10 pb-12 flex flex-col items-center">
    
    <div className="mt-10 w-full  ">
      <div className="sm:col-span-4">
        <label for="username" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input ref={titleRef} type="text" value={product?product.title:''} 
            onChange={(e)=>{setProduct({...product,title:e.target.value})}} name="title" id="title"   autocomplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 " placeholder="" />
          </div>
        </div>
      </div>
          
      <div className="sm:col-span-4">
        <label for="username" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input ref={catRef}  type="text" value={product?product.category:''}
            onChange={(e)=>{setProduct({...product,category:e.target.value})}} name="category" id="category" autocomplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 " placeholder="" />
          </div>
        </div>
      </div>
      <div className="sm:col-span-4">
        <label for="username" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input ref={priceRef}  type="text" value={product?product.price:''}
            onChange={(e)=>{setProduct({...product,price:e.target.value})}} name="price" id="price" autocomplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 " placeholder="" />
          </div>
        </div>
      </div>
      <div className="col-span-full">
        <label for="about" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
        <div className="mt-2">
          <textarea ref={desRef} value={product?product.description:''}
          onChange={(e)=>{setProduct({...product,description:e.target.value})}} id="cat" name="cat" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4" ></textarea>
        </div>
      </div>   
      

      <div className="col-span-full">
        <label for="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
            </svg>
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label for="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e)=>{setFile(e.target.files[0])}}/>
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF</p>
          </div>
        </div>
        </div>
        <div className="my-4 flex justify-center items-center">
          <button className="btn bg-orange-400 px-6 py-2 text-lg rounded-lg text-white mr-6 " onClick={handleSubmission}>save</button>
          <button className="btn bg-red-500 px-6 py-2 text-lg rounded-lg text-white" onClick={()=>{
            handleDelete(product.id)
          }}>Delete Product</button>

        </div>

        </div>
        <div className="h-20">
          {saveAlert==1&&
            <span className="inline-flex items-center rounded-md bg-green-50 px-10 py-3 text-2xl font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mt-8 " >saved</span>
          }
          {saveAlert==0&&
            <span className="inline-flex items-center rounded-md bg-red-50 px-10 py-3 text-2xl font-medium text-red-700 ring-1 ring-inset ring-red-600/20 mt-8 " >Invalid data</span>
          }
        </div>

        </div>
        </div>



 


        }
        </>
    )
}
export default AddProduct