import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { ApiProductsType, productType } from '../types/types';
import { reducerType } from './store';

const getProducts = createAsyncThunk('products/getProducts',async(uri:string,{rejectWithValue,getState})=>{
    try{
        const {products:{filters:{categories,companies,min,max},page}}:reducerType = getState() as reducerType;
        const data:ApiProductsType = (await(await fetch(import.meta.env.VITE_API_BASE_URL+uri+`page=${page}`+`${(categories)?("&categories="+categories.join(',')):""}${(companies)?("&companies="+companies.join(',')):""}${min?"&min="+min:''}${max?"&max="+max:""}`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        })).json());
        if(data.status){
            return (data.status)&&data;
        }else{
            throw data;
        }
    }catch(e){
        return ((e as ApiProductsType).errors)?rejectWithValue((e as ApiProductsType).errors):rejectWithValue((e as Error).message);
    }
});
const initialState:{
    products:productType[]|null,
    page:number,
    error:boolean,
    numberOfPage:number,
    filters:{
        categories:string[]|null,
        companies:string[]|null,
        min:number|null,
        max:number|null
    }
} = {
    products:null,
    error:false,
    page:1,
    numberOfPage:0,
    filters:{
        categories:null,
        companies:null,
        min:null,
        max:null
    }
};
const productseducer = createSlice({
    name:'products',
    initialState,
    reducers:{
        addCategories:(state,action)=>{
            if((action.payload as string[]).length==0){
                state.filters.categories=null;
            }else{
                state.filters.categories=action.payload; 
            }
        },
        addcompanies:(state,action)=>{
            if((action.payload as string[]).length==0){
                state.filters.companies=null;
            }else{
                state.filters.companies=action.payload; 
            }
        },
        addMin:(state,action)=>{
            if((action.payload as number)===0){
                state.filters.min=null;
            }else{
                state.filters.min=action.payload;
            }
        },
        addMax:(state,action)=>{
            if((action.payload as number)===0){
                state.filters.max=null;
            }else{
                state.filters.max=action.payload;
            }
        },
        nextPage:(state)=>{
            state.page+=1;
        },
        prevPage:(state)=>{
            state.page-=1;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getProducts.pending,(state)=>{
            state.products=null;
            state.error=false;
        });
        builder.addCase(getProducts.fulfilled,(state,action)=>{
            if(action.payload!==undefined){
                state.products=(action.payload.products as productType[]);
                state.numberOfPage=(action.payload.numberOfPage as number);
                state.error=false;
            }
        });
        builder.addCase(getProducts.rejected,(state)=>{
            state.products=null;
            state.error=true;
        });
    }
});

const {reducer:reducer,actions:{addCategories,addcompanies,addMin,addMax,prevPage,nextPage}} = productseducer;

export default {reducer,getProducts,addCategories,addcompanies,addMin,addMax,prevPage,nextPage};