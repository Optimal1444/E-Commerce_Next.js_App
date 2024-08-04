'use client'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

const initialize=()=>{
    const firebaseConfig = {
        apiKey: "AIzaSyACMgLax-P_T9-XI_ULzR-B6k1lHll9ZPE",
        authDomain: "registration-8b460.firebaseapp.com",
        projectId: "registration-8b460",
        storageBucket: "registration-8b460.appspot.com",
        messagingSenderId: "166647965144",
        appId: "1:166647965144:web:09625519911cd0c2413ead"
      };
    const app = initializeApp(firebaseConfig);
}
export const registerUser=createAsyncThunk(
    'login/registerUser',
    async(cred)=>{
        initialize()
        const auth = getAuth();
        const db=getFirestore()
        let response=null
        await createUserWithEmailAndPassword(auth, cred.mail, cred.pass)
        .then((userCredential) => {
            const uid = userCredential.user.uid;
            const userData=cred
            userData.uid=uid
            delete userData.pass
            const docRef=doc(db,'users',uid)
            setDoc(docRef,userData)
            response=userData
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            response = errorCode
        });

        return response
    }
)
export const loginUser=createAsyncThunk(
    'login/loginUser',
    async(cred)=>{
        initialize()
        const auth = getAuth();
        const db=getFirestore()
        let response=null
        let uid=null
        await signInWithEmailAndPassword(auth, cred.mail, cred.pass)
        .then((userCredential) => {
            uid = userCredential.user.uid;
                     
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            response= errorCode
        });
        const docRef=doc(db,'users',uid)  
        await getDoc(docRef).then(res=>res.data()).then(data=>{ response=data})
        return response
        
    }
)
const initialState={
    loading:false,
    user:null,
    error:null,
    totalItemsInCart:0
}
const LoginSlice=createSlice({
    name:"login",
    initialState,
    reducers:{
        handleLogOut(state){
            state.loading=false
            state.user=null
            state.error=null
            state.totalItemsInCart=0
        },
        setItems(state,action){
            state.totalItemsInCart=action.payload
        },
        setUser(state,action){
            state.user=action.payload
            initialize()
            const db=getFirestore()
            const docRef=doc(db,'users',state.user.uid)
            updateDoc(docRef,state.user)
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.loading=true
            state.user=null
            state.error=null
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading=false
            if(typeof action.payload =='string'){
            state.error=action.payload
            state.user=null
            }
            else{
                state.error=null
                state.user=action.payload
            }
        })
        .addCase(loginUser.pending,(state)=>{
            state.loading=true
            state.user=null
            state.error=null
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false
            if(typeof action.payload =='string'){
            state.error=action.payload
            state.user=null
            }
            else{
                state.error=null
                state.user=action.payload
            }
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false
            state.error='Email or password is not valid'
            state.user=null
           
        })
        
    }
})
export const {handleLogOut,setItems,setUser}=LoginSlice.actions
export default LoginSlice.reducer