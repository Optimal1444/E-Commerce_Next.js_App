'use client'
import { useSelector } from "react-redux"
import { initializeApp } from "firebase/app";
import { useEffect, useRef, useState } from "react";
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import 'animate.css';

function Contact(){
    const navigate=useRouter()
    const user=useSelector(state=>state.login)
    const firebaseConfig = {
        apiKey: "AIzaSyACMgLax-P_T9-XI_ULzR-B6k1lHll9ZPE",
        authDomain: "registration-8b460.firebaseapp.com",
        projectId: "registration-8b460",
        storageBucket: "registration-8b460.appspot.com",
        messagingSenderId: "166647965144",
        appId: "1:166647965144:web:09625519911cd0c2413ead"
      };
    const app = initializeApp(firebaseConfig);
    const [messages,setMessages]=useState([])
    const inputRef=useRef('')
    const outputRef=useRef()
    const db=getFirestore()
    
    useEffect(()=>{
        if(user.user){
        const q=query(collection(db,"messages"),orderBy("timestamp"))
        onSnapshot(q,snapshot=>{
            setMessages(snapshot.docs.map(doc=>(
                {
                    data:doc.data()
                }
        )))
        })
        outputRef.current.scrollTop =outputRef.current.scrollHeight
        }
           

    },[inputRef.current.value])
    const handleClick=async()=>{
    await addDoc(collection(db,"messages"),
    {
        uid:user.user.uid,
        name:`${user.user.firstName} ${user.user.lastName}`,
        text:inputRef.current.value,
        timestamp:serverTimestamp()
    }
    )
    inputRef.current.value=''
    }
    return(
        <>
        {user.user&&
            <div className=" mt-10 bg-white shadow-lg rounded-lg overflow-hidden md:mx-52 mx-10 ">
                <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase ">
                    Chat with our clients
                </div>
                <div className="mt-4 mb-4 px-4 h-80 overflow-y-scroll " ref={outputRef} >
                    {messages.map((msg,index)=>
                        
                        <div className="mx-4 bg-green-100 my-2 px-2 py-2 rounded-md" >
                            <h1 className="text-lg font-bold ">{msg.data.uid==user.user.uid?'Me':msg.data.name}</h1>
                            <div className="text-xl overflow-x-auto">{msg.data.text}</div>
                            <div className="text-xs   text-right">{msg.data.timestamp?`${msg.data.timestamp.toDate().toDateString()} ${msg.data.timestamp.toDate().toLocaleTimeString()}`:''}</div>
                        </div>
                    )

                    }
                </div>
                <div className="flex gap-2 items-center justify-center my-6">
                    <input
                        ref={inputRef}
                        className="shadow appearance-none border ml-10 mr-4 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    <button className="btn bg-orange-400 rounded-md px-4 py-2 mr-10" onClick={handleClick}>
                        <img src="paper-plane-regular.svg" alt=""/>
                    </button>
                </div>
                
            </div>
            
        }
         {!user.user&&
            <div>
                <div className="animate__animated animate__fadeIn flex flex-col items-center justify-center my-20 ">
                    <img
                    className="h-20 w-auto animate__animated animate__wobble"
                    src="message-regular.svg"
                    alt=""
                    />
                    <h1 className="text-3xl my-10">you are signed out</h1>
                    <button className="btn bg-black text-white mt-6  px-4 py-2 text-2xl rounded" onClick={()=>{navigate.push('/login')}}>Login to chat with our clients!</button>
                </div>
            </div>
        } 
        </>
    )
}
export default Contact