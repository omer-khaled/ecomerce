import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ApiCartType, cartType, productType} from '../types/types'
import axios from 'axios';

const getCart = createAsyncThunk('cart/getCart',async(_,{rejectWithValue})=>{
    try{
        const {data}:{data:ApiCartType} = await axios.get(import.meta.env.VITE_API_BASE_URL+"/cart/getCart",{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        if(data.status){
            return (data.status)&&data;
        }else{
            throw data;
        }
    }catch(e){
        return ((e as ApiCartType).errors)?rejectWithValue((e as ApiCartType).errors):rejectWithValue((e as Error).message);
    }
});

const addToCart = createAsyncThunk('cart/addToCart',async(productId:string,{rejectWithValue})=>{
    try{
        const {data}:{data:{status:boolean,message:string,errors:string|[]|undefined}} = await axios.get(import.meta.env.VITE_API_BASE_URL+`/cart/addToCart/${productId}`,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        if(data.status){
            return {status:data.status,id:productId};
        }else{
            throw data;
        }
    }catch(e){
        return ((e as {status:boolean,message:string,errors:string|[]|undefined}).errors)?rejectWithValue((e as {status:boolean,message:string,errors:string|[]|undefined}).errors):rejectWithValue((e as Error).message);
    }
});

const decreaseFromCart = createAsyncThunk('cart/decreaseFromCart',async(productId:string,{rejectWithValue})=>{
    try{
        const {data}:{data:{status:boolean,message:string,errors:string|[]|undefined}} = await axios.get(import.meta.env.VITE_API_BASE_URL+`/cart/decreaseinCart/${productId}`,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        if(data.status){
            return {status:data.status,id:productId};
        }else{
            throw data;
        }
    }catch(e){
        return ((e as {status:boolean,message:string,errors:string|[]|undefined}).errors)?rejectWithValue((e as {status:boolean,message:string,errors:string|[]|undefined}).errors):rejectWithValue((e as Error).message);
    }
});

const removeFromCart = createAsyncThunk('cart/removeFromCart',async(productId:string,{rejectWithValue})=>{
    try{
        const {data}:{data:{status:boolean,message:string,errors:string|[]|undefined}} = await axios.get(import.meta.env.VITE_API_BASE_URL+`/cart/deleteFromCart/${productId}`,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        if(data.status){
            return {status:data.status,id:productId};
        }else{
            throw data;
        }
    }catch(e){
        return ((e as {status:boolean,message:string,errors:string|[]|undefined}).errors)?rejectWithValue((e as {status:boolean,message:string,errors:string|[]|undefined}).errors):rejectWithValue((e as Error).message);
    }
});


const initialState:cartType={
    cart:null,
    totalPrice:0,
    error:false
}

const cart = createSlice({
    name:'cart',
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder.addCase(getCart.pending,(state)=>{
            state.cart=null;
            state.error=false;
        });
        builder.addCase(getCart.fulfilled,(state,action)=>{
            if(action.payload!==undefined){
                state.cart = (action.payload.cart as {product:productType,qty:number}[]);
                state.totalPrice=(action.payload.totalPrice as number);
                state.error=false;
            }
        });
        builder.addCase(getCart.rejected,(state)=>{
            state.cart=null;
            state.error=true;
        });
        builder.addCase(addToCart.fulfilled,(state,action)=>{
            if(action.payload.status){
                const foundedItem = state.cart?.find((el:{product:productType,qty:number})=>{
                    return el.product._id===action.payload.id;
                });
                if(foundedItem){
                    foundedItem.qty += 1;
                    state.totalPrice+=foundedItem.product.price;
                }
                state.error=false;
            }
        });
        builder.addCase(addToCart.rejected,(state)=>{
            state.cart=null;
            state.error=true;
        });
        builder.addCase(removeFromCart.fulfilled,(state,action)=>{
            if(action.payload.status){
                const foundedItem = state.cart?.find((el:{product:productType,qty:number})=>{
                    return el.product._id===action.payload.id;
                });
                state.cart = (state.cart?.filter((el:{product:productType,qty:number})=>{
                    return el.product._id!==action.payload.id;
                })||state.cart);
                if(foundedItem){
                    state.totalPrice-=(foundedItem.qty*foundedItem.product.price);
                }
                state.error=false;
            }
        });
        builder.addCase(removeFromCart.rejected,(state)=>{
            state.cart=null;
            state.error=true;
        });
        builder.addCase(decreaseFromCart.fulfilled,(state,action)=>{
            if(action.payload.status){
                const foundedItem = state.cart?.find((el:{product:productType,qty:number})=>{
                    return el.product._id===action.payload.id;
                });
                if(foundedItem){
                    if(foundedItem.qty===1){
                        state.cart = (state.cart?.filter((el:{product:productType,qty:number})=>{
                            return el.product._id!==action.payload.id;
                        })||state.cart);
                    }else{
                        foundedItem.qty-=1;   
                    }
                    state.totalPrice-=foundedItem.product.price;
                }
                state.error=false;
            }
        });
        builder.addCase(decreaseFromCart.rejected,(state)=>{
            state.cart=null;
            state.error=true;
        });
    }
});

const {reducer:reducer} = cart;

export default {reducer,getCart,addToCart,removeFromCart,decreaseFromCart};