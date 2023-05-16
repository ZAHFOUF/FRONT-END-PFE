import { createSlice} from '@reduxjs/toolkit' ;
import { fakeProjects } from '../fake data';




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


export default projects