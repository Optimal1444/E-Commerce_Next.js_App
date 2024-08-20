'use client'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { checkUser, createUser, updateUser } from "../Services";


export const registerUser=createAsyncThunk(
    'login/registerUser',
    async(cred)=>{
        let response=null
        await createUser(cred).then((res)=>{
            response=res        
        })
        .catch((error) => {
            response=error.response
        });

        return response
    }
)
export const loginUser=createAsyncThunk(
    'login/loginUser',
   
    async(cred)=>{
        
        
        let response=null
        await checkUser(cred).then((res)=>{
            response=res
        }
        )
        .catch((error) => {
            response=error.response
        });
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
            updateUser(state.user)
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
            if(action.payload.status!=200){
            state.error=action.payload.data.error
            state.user=null
            }
            else{
                state.error=null
                state.user=action.payload.data
            }
        })
        .addCase(loginUser.pending,(state)=>{
            state.loading=true
            state.user=null
            state.error=null
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
            if(action.payload.status!=200){
                state.user=null
                state.error=action.payload.data.error
            }
            else
                state.user=action.payload.data
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