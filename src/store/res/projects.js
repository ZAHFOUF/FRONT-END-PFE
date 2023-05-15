import { createSlice} from '@reduxjs/toolkit' ;
import { uniq, uniqueId } from 'lodash';


const fakeData = [{id:uniqueId('project-company-doioedalx-'),name:"Project 1",des:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",status:"In",
startDate:"05/05/2023",startEnd:"05/06/2023",budget:"300000 DH",org:"https://www.iam.ma/ImagesMarocTelecom/Phototh%C3%A8que/Images-grandes/maroc-telecom-bleu-fr-grande.jpg",chef:"Younes Zahfouf"} , 
{id:uniqueId('project-company-doioedalx-'),name:"Project 2",des:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",status:"Com",
startDate:"27/05/2023",startEnd:"10/07/2023",budget:"300000 DH",org:"https://upload.wikimedia.org/wikipedia/commons/f/fc/IBM_logo_in.jpg",chef:"Mostafa Amine"}]


const projects = createSlice({
    name:"projects" , 
    initialState : fakeData ,
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