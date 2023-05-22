import { uniq, uniqueId } from 'lodash';

export const fakePhases = [
    {
       code: "CRP-001",
       name: "Create React App Project 1",
       description: "Developing a web application using Create React App 1",
       startDate: "2023-05-01",
       endDate: "2023-06-30",
       budgetPercentage: 20,
       assignedEmployees: [
         { id: 1, nom: "John Doe" ,  photo:'https://mui.com/static/images/avatar/1.jpg' },
         { id: 2, nom: "Jane Smith" , photo: 'https://mui.com/static/images/avatar/2.jpg' },
         { id: 3, nom: "Alex Johnson" , photo:'https://mui.com/static/images/avatar/3.jpg' },
       ],
       deliverables: [
         { code: "DLVR-001", name: "Initial UI Design", description: "Mockup of UI design" },
         { code: "DLVR-002", name: "React Components", description: "Developing reusable React components" },
         { code: "DLVR-003", name: "API Integration", description: "Integration with backend API endpoints" },
       ],
       status: "Ongoing",
     } ,
 
     {
       code: "CRP-002",
       name: "Create React App Project 2",
       description: "Developing a web application using Create React App 2",
       startDate: "2023-07-01",
       endDate: "2023-08-31",
       budgetPercentage: 30,
       assignedEmployees: [
         { id: 4, nom: "Sarah Johnson" , photo:'https://mui.com/static/images/avatar/1.jpg' },
         { id: 5, nom: "Michael Brown" , photo: 'https://mui.com/static/images/avatar/2.jpg' },
       ],
       deliverables: [
         { code: "DLVR-004", name: "Wireframe Design", description: "Creating wireframes for UI" },
         { code: "DLVR-005", name: "Backend Integration", description: "Integrating with backend systems" },
       ],
       status: "Revision",
     }
 
     ,
     
     {
       code: "CRP-003",
       name: "Create React App Project 3",
       description: "Developing a web application using Create React App 3",
       startDate: "2023-09-01",
       endDate: "2023-10-31",
       budgetPercentage: 10,
       assignedEmployees: [
        { id: 1, nom: "John Doe" ,  photo:'https://mui.com/static/images/avatar/1.jpg' },
        { id: 3, nom: "Alex Johnson" , photo:'https://mui.com/static/images/avatar/4.jpg' },
       ],
       deliverables: [
         { code: "DLVR-006", name: "User Authentication", description: "Implementing user authentication functionality" },
         { code: "DLVR-007", name: "Database Integration", description: "Integrating with a database system" },
         { code: "DLVR-008", name: "Testing and Bug Fixes", description: "Performing testing and fixing bugs" },
       ],
       status: "Ongoing",
     }
 
 ]



export const fakeProjects =  [{id:uniqueId('project-company-doioedalx-'),name:"Project 1",des:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",status:"In",
startDate:"2023-05-05",startEnd:"2023-06-23",budget:300000 ,org:{cover:"https://www.iam.ma/ImagesMarocTelecom/Phototh%C3%A8que/Images-grandes/maroc-telecom-bleu-fr-grande.jpg" , id:1 , name: "IAM"},chef:{id:1,name:"Younes Zahfouf",icon:'https://api.mycoachpro.net/images/ya19W6ZUMktj0fAp0TEHMrCX8cqSPCCsK6uRaQ1I.png'},progress:25} , 
{id:uniqueId('project-company-doioedalx-'),name:"Project 2",des:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",status:"Com",
startDate:"2023-05-27",startEnd:"2023-07-23",budget:300000 ,org:{ cover : "https://upload.wikimedia.org/wikipedia/commons/f/fc/IBM_logo_in.jpg" , id:2 , name: "IBM" },chef:{id:2,name:"Mostafa Amine",icon:'https://api.mycoachpro.net/images/HH3PXgpo4qsZqTtlQYMJiWwA9LzXhfa5ZuPtVPyB.png'},progress:100} ,
{id:uniqueId('project-company-doioedalx-'),name:"Project 3",des:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",status:"Can",
startDate:"2023-07-27",startEnd:"2023-10-08",budget:500000 ,org:{ cover :"https://cdn.logojoy.com/wp-content/uploads/2018/05/01104823/1454.png" , id:3 , name: "KPCAPITAL" },chef:{id:2,name:"Mostafa Amine",icon:'https://api.mycoachpro.net/images/HH3PXgpo4qsZqTtlQYMJiWwA9LzXhfa5ZuPtVPyB.png'},progress:55} , 
{id:uniqueId('project-company-doioedalx-'),name:"Project 4",des:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",status:"In",
startDate:"2023-09-27",startEnd:"2023-10-10",budget:600000 ,org:{ cover : "https://cdn.logojoy.com/wp-content/uploads/2018/05/01104832/1647.png" , id:3 , name: "BuissnesVoice" },chef:{id:1,name:"Younes Zahfouf",icon:'https://api.mycoachpro.net/images/ya19W6ZUMktj0fAp0TEHMrCX8cqSPCCsK6uRaQ1I.png'},progress:44}]