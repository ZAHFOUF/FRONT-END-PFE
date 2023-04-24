/* eslint-disable array-callback-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable import/no-mutable-exports */
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { AES, enc } from 'crypto-js';
import axios from '../api/axios';


// ----------------------------------------------------------------------

let users = []


axios.get("/api/users").then((e)=>{

  const data = e.data.data

  data.map((e)=>{
     users.push({
      id: faker.datatype.uuid(),
      avatarUrl: `/assets/images/avatars/avatar_1.jpg`,
      name: e.name ,
      company: e.email,
      isVerified: faker.datatype.boolean(),
      status: sample(['active', 'banned']),
      role: e.role[0].name,
     })
  })

  
})




const roles ={
  all:['dashboard',"projects",'user',"blog"],
  admin:['dashboard',"projects",'user'],
  directeur: ["projects","blog"] ,
 
} 


export function respo () {
  if (localStorage.getItem("user_session")) {
    const key = JSON.parse(localStorage.getItem("user_session"))
    const hash = AES.decrypt(key.user.role,"younes")
    const role = hash.toString(enc.Utf8)
  
   const repos =  roles[role]
   
  
   return repos

  }

  return roles.all

 

  
}

console.log(users);

export default users;
