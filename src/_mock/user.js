/* eslint-disable array-callback-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable import/no-mutable-exports */
import { useDispatch  } from 'react-redux'


import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { AES, enc } from 'crypto-js';
import { actionsUsers } from '../store'

import axios from '../api/axios';


// ----------------------------------------------------------------------

 let users = []


/* axios.get("/api/users").then((e)=>{

  const data = e.data.data
  const dispatch = useDispatch()

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

  dispatch(actionsUsers.addUsers(users))

  
}) */


/* "projects",'employees',"blog" */

const roles ={
  all:[{reccord:'dashboard',access:{C:true,R:true,U:true,D:true} }, {reccord:'projects',access:{C:true,R:true,U:true,D:true}} , {reccord:'employees',access:{C:true,R:true,U:true,D:true} } , {reccord:'blog',access:{C:true,R:true,U:true,D:true} }],
  admin:[{reccord:'dashboard',access:{C:true,R:true,U:true,D:true} } , {reccord:'employees',access:{C:true,R:true,U:true,D:true,DU:true} },{reccord:'projects',access:{C:true,R:true,U:true,D:true}}],
  directeur: [{reccord:'organismes',access:{C:true,R:true,U:true,D:true} },{reccord:'blog',access:{C:true,R:true,U:true,D:true} },{reccord:'employees',access:{C:false,R:true,U:false,D:false,DU:false} }] ,
  comptable:[{reccord:'blog',access:{C:true,R:true,U:true,D:true} }] ,
  secretaire:[{reccord:'organismes',access:{C:true,R:true,U:true,D:true} }] ,
  chef_projet:[{reccord:'employees',access:{C:false,R:true,U:false,D:false,DU:false} } , {reccord:'projects',access:{C:true,R:true,U:true,D:true}} ] 

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

export const settings = {OTP:false}

 


export default users;
