/* eslint-disable prefer-template */
/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice} from '@reduxjs/toolkit' ;
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import axiosClient from '../../api/axios';


const pathRoles = "/api/roles"



const roles = createSlice({
    name:"roles" , 
    initialState : [] ,
    reducers : {
        addRoles (roles,action) {
           return [...roles,action.payload]
        }
    ,
    removeRoles (roles,action) {

         const filter = roles.filter((e)=> e.id !== action.payload.id)
        

         return [...filter]

    },
    loadRoles (roles,action) {
        return [...action.payload]
     } ,
     upRoles (users,action) {
        const filter = users.filter((e)=> e.id !== action.payload.id)
        return [...filter,action.payload.data]
     }

}
})


export function  loadRoles (callback,err) {

    axiosClient.get(pathRoles).then((e)=>{

      callback(e.data)
   

    }).catch((e)=>{
        err(e)
    })



}


export function  addRoles (callback,err,data) {
  
     axiosClient.post(pathRoles,data).then((e)=>{
  
       callback(e.data)
    
  
     }).catch((e)=>{
         err(e)
     })
  
  
  
  }

  export function  upRole (callback,err,role,data) {
  
    axiosClient.put(pathRoles + `/${role}`,data).then((e)=>{
 
      callback(e.data)
   
 
    }).catch((e)=>{
        err(e)
    })
 
 
 
 }

 export function  deleteRole (callback,err,role,) {
  
  axiosClient.delete(pathRoles + `/${role}`).then((e)=>{

    callback(e.data)
 

  }).catch((e)=>{
      err(e)
  })



}
  

export default roles