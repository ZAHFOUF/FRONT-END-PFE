import { createSlice} from '@reduxjs/toolkit' ;



const fakeData = [
  

]


const organismes = createSlice({
    name:"organismes" , 
    initialState : fakeData ,
    reducers : {
        addOrganismes (organismes,action) {
           return [...organismes,action.payload]
        }
    ,
    removeOrganismes (organismes,action) {

         const filter = organismes.filter((e)=> e.id !== action.payload.id)
        

         return [...filter]

    },
    loadOrganismes (organismes,action) {
        return [...action.payload]
     } ,
     upOrganismess (users,action) {
        const filter = users.filter((e)=> e.id !== action.payload.id)
        return [...filter,action.payload.data]
     }

}
})


export default organismes