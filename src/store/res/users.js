import { createSlice} from '@reduxjs/toolkit' ;



const users = createSlice({
    name:"users" , 
    initialState : [ ] ,
    reducers : {
        addUsers (users,action) {
           return [...users,action.payload]
        }
    ,
    removeUsers (users,action) {

         const filter = users.filter((e)=> e.id !== action.payload.id)
        

         return [...filter]

    },
    loadUsers (users,action) {
        return [...action.payload]
     } ,
     upUsers (users,action) {
        const filter = users.filter((e)=> e.id !== action.payload.id)
        return [...filter,action.payload.data]
     }

}
})


export default users