/* eslint-disable prefer-template */
import { createSlice} from '@reduxjs/toolkit' ;
import _ from 'lodash';
import { fakePhases } from '../fake data';

import axiosClient from '../../api/axios';


const pathPhases = "/api/phases"

const phases = createSlice({
    name:"phases" , 
    initialState : [] ,
    reducers : {
        addPhases (phases,action) {
           return [...phases,action.payload]
        }
    ,
    removePhases (phases,action) {

         const filter = phases.filter((e)=> e.code !== action.payload.id)
        

         return [...filter]

    },
    loadPhases (phases,action) {
        return [...action.payload]
     } ,
     upPhasess (phases,action) {

        const filter = phases.filter((e)=> e.code !== action.payload.data.code)
        return [...filter,action.payload.data]
     } ,
 
    

}
})



export function  loadPhases (callback,err,project) {

   axiosClient.get(pathPhases + `?id=${project}`).then((e)=>{

     callback(e.data)
  

   }).catch((e)=>{
       err(e)
   })



}




export function  addPhase (callback,err,data) {
   console.log(data);
 
    axiosClient.post(pathPhases,data).then((e)=>{
 
      callback(e.data)
   
 
    }).catch((e)=>{
        err(e)
    })
 
 
 
 }
 
 export function  editPhase (callback,err,data,id) {
 
    axiosClient.put(pathPhases + `/${id}`,data).then((e)=>{
 
      callback(e.data)
   
 
    }).catch((e)=>{
        err(e)
    })
 
 
 
 }


 export function  editPhaseField (callback,err,data,id) {
 
   axiosClient.put(pathPhases + `/${id}`,data).then((e)=>{

     callback(e.data)
  

   }).catch((e)=>{
       err(e)
   })



}
 
 export function  deletePhase (callback,err,id) {
 
    axiosClient.delete(pathPhases + `/${id}`).then((e)=>{
 
      callback(e.data)
   
 
    }).catch((e)=>{
        err(e)
    })
 
 
 
 }


export default phases