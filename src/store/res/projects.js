/* eslint-disable prefer-template */
/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice} from '@reduxjs/toolkit' ;
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { fakeProjects } from '../fake data';
import axiosClient from '../../api/axios';


const pathProjects = "/api/"



const projects = createSlice({
    name:"projects" , 
    initialState : fakeProjects ,
    reducers : {
        addProjects (projects,action) {
           return [...projects,action.payload]
        }
    ,
    removeProjects (projects,action) {

         const filter = projects.filter((e)=> e.id !== action.payload.id)
        

         return [...filter]

    },
    loadProjects (projects,action) {
        return [...action.payload]
     } ,
     upProjects (users,action) {
        const filter = users.filter((e)=> e.id !== action.payload.id)
        return [...filter,action.payload.data]
     }

}
})

export function  loadProjects (callback,err) {

    axiosClient.get(pathProjects).then((e)=>{

      callback(e.data)
   

    }).catch((e)=>{
        err(e)
    })



}


export function  addProject (callback,err,data) {

   axiosClient.post(pathProjects,data).then((e)=>{

     callback(e.data)
  

   }).catch((e)=>{
       err(e)
   })



}

export function  editProject (callback,err,data,id) {

   axiosClient.put(pathProjects + `/${id}`,data).then((e)=>{

     callback(e.data)
  

   }).catch((e)=>{
       err(e)
   })



}

export function  deleteProject (callback,err,id) {

   axiosClient.put(pathProjects + `/${id}`).then((e)=>{

     callback(e.data)
  

   }).catch((e)=>{
       err(e)
   })



}


export default projects