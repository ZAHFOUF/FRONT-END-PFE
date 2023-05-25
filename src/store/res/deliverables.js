import { createSlice} from '@reduxjs/toolkit' ;
import _ from 'lodash';
import axiosClient from '../../api/axios';


const pathPhases = "/api/livrables"



const deliverables = createSlice({
    name:"deliverables" , 
    initialState : [] ,
    reducers : {
        adddeliverables (deliverables,action) {
         
           return [...deliverables,action.payload]
        }
    ,
    removedeliverables (deliverables,action) {

         const filter = deliverables.filter((e)=> e.code !== action.payload.id)
        

         return [...filter]

    },
    loaddeliverables (deliverables,action) {
        return [...action.payload]
     } ,
     updeliverabless (deliverables,action) {
        const filter = deliverables.filter((e)=> e.id !== action.payload.id)
        return [...filter,action.payload.data]
     } ,
 
    

}
})

export function  addDel (callback,err,data) {
   console.log(data);
 
    axiosClient.post(pathPhases,data).then((e)=>{
 
      callback(e.data)
   
 
    }).catch((e)=>{
        err(e)
    })
 
 
 
 }

export default deliverables