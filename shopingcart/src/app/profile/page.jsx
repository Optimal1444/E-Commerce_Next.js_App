'use client'
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../redux/LoginSlice";
import { ClipLoader } from "react-spinners";

function Profile(){

    const firstNameRef=useRef()
    const lastNameRef=useRef()
    const phoneRef=useRef()
    const addressRef=useRef()
    const dispatch=useDispatch()
    const user=useSelector((state)=>state.login)
    const [loading,setLoading]=useState([false,false,false,false])
    const handleSpinner=(index)=>{
        const arr=[false,false,false,false]
        arr[index]=true
        setLoading(arr)
        setTimeout(() => {
            setLoading([false,false,false,false])
        }, 1000);
    }
    
    return(
        <>
            {user.user&&
            <div className=" mt-10 bg-white shadow-lg rounded-lg overflow-hidden md:mx-52 mx-10 ">
                <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase ">
                    Profile
                </div>
                    <div className="mt-4 mb-4 px-4">
                        <label className="block text-gray-700 font-bold mb-2" for="firstName">
                            First Name
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                ref={firstNameRef}
                                id="firstName"
                                className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={user.user.firstName} onChange={(e)=>{dispatch(setUser({...user.user,firstName:e.target.value}));handleSpinner(0)}} />
                            <ClipLoader
                                        color={'#FB923C'}
                                        loading={loading[0]}
                                        size={25}
                                    />
                        </div>
                        
                    </div>
                    <div className="mb-4 px-4">
                        <label className="block text-gray-700 font-bold mb-2" for="lastName">
                            Last Name
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                ref={lastNameRef}
                                id="lastName"
                                className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={user.user.lastName} onChange={(e)=>{dispatch(setUser({...user.user,lastName:e.target.value}));handleSpinner(1)}} />
                            <ClipLoader
                                    color={'#FB923C'}
                                    loading={loading[1]}
                                    size={25}
                                />
                        </div>
                        
                    
                    </div>
                    <div className="mb-4 px-4">
                        <label className="block text-gray-700 font-bold mb-2" for="phone">
                            Phone Number
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                ref={phoneRef}
                                id="phone"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={user.user.phone} onChange={(e)=>{dispatch(setUser({...user.user,phone:e.target.value}));handleSpinner(2)}} />
                            <ClipLoader
                                    color={'#FB923C'}
                                    loading={loading[2]}
                                    size={25}
                                />
                        </div>
                        
                            
                    </div>
                    <div className="mb-4 px-4">
                        <label className="block text-gray-700 font-bold mb-2" for="address">
                            Address
                        </label>
                        <div className="flex items-center gap-2">
                        <input
                            ref={addressRef}
                            id="address"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={user.user.address} onChange={(e)=>{dispatch(setUser({...user.user,address:e.target.value}));handleSpinner(3)}} />
                        <ClipLoader
                                    color={'#FB923C'}
                                    loading={loading[3]}
                                    size={25}
                                /> 
                        </div>
                          
                            
                    </div> 
               
                    


            </div>
        }
      
        </>
    )
}
export default Profile