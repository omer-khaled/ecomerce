import {createSlice} from '@reduxjs/toolkit';
import { authType } from '../types/types';
const initialState:authType = {
    auth:false,
    token:null,
    user:null
}
const authReducer = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,actions)=>{
            state.auth = true;
            state.token = actions.payload.token;
            state.user = actions.payload.user;
        },
        logout:(state)=>{
            state.auth = null;
        },
    }
});

const {reducer:reducer,actions:{login,logout}} = authReducer;

export default {reducer,login,logout};