import { createSlice} from '@reduxjs/toolkit' ;
import { fakePhases } from '../fake data';



const phases = createSlice({
    name:"phases" , 
    initialState : fakePhases ,
    reducers : {
        addPhases (phases,action) {
           return [...phases,action.payload]
        }
    ,
    removePhases (phases,action) {

         const filter = phases.filter((e)=> e.id !== action.payload.id)
        

         return [...filter]

    },
    loadPhases (phases,action) {
        return [...action.payload]
     } ,
     upPhasess (users,action) {
        const filter = users.filter((e)=> e.id !== action.payload.id)
        return [...filter,action.payload.data]
     }

}
})


export default phases