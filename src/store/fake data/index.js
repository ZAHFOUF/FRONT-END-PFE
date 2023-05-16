import { uniq, uniqueId } from 'lodash';

export const fakePhases = [
    {
       code: "CRP-001",
       name: "Create React App Project 1",
       description: "Developing a web application using Create React App 1",
       startDate: "2023-05-01",
       endDate: "2023-06-30",
       budgetPercentage: 80,
       assignedEmployees: [
         { id: 1, name: "John Doe" },
         { id: 2, name: "Jane Smith" },
         { id: 3, name: "Alex Johnson" },
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
       budgetPercentage: 70,
       assignedEmployees: [
         { id: 4, name: "Sarah Johnson" },
         { id: 5, name: "Michael Brown" },
       ],
       deliverables: [
         { code: "DLVR-004", name: "Wireframe Design", description: "Creating wireframes for UI" },
         { code: "DLVR-005", name: "Backend Integration", description: "Integrating with backend systems" },
       ],
       status: "In Revision",
     }
 
     ,
     
     {
       code: "CRP-003",
       name: "Create React App Project 3",
       description: "Developing a web application using Create React App 3",
       startDate: "2023-09-01",
       endDate: "2023-10-31",
       budgetPercentage: 90,
       assignedEmployees: [
         { id: 6, name: "Emily Wilson" },
         { id: 7, name: "David Thompson" },
         { id: 8, name: "Sophia Davis" },
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
startDate:"05/05/2023",startEnd:"05/06/2023",budget:"300000 DH",org:"https://www.iam.ma/ImagesMarocTelecom/Phototh%C3%A8que/Images-grandes/maroc-telecom-bleu-fr-grande.jpg",chef:{name:"Younes Zahfouf",icon:'https://api.mycoachpro.net/images/ya19W6ZUMktj0fAp0TEHMrCX8cqSPCCsK6uRaQ1I.png'},progress:25} , 
{id:uniqueId('project-company-doioedalx-'),name:"Project 2",des:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",status:"Com",
startDate:"27/05/2023",startEnd:"10/07/2023",budget:"300000 DH",org:"https://upload.wikimedia.org/wikipedia/commons/f/fc/IBM_logo_in.jpg",chef:{name:"Mostafa Amine",icon:'https://api.mycoachpro.net/images/HH3PXgpo4qsZqTtlQYMJiWwA9LzXhfa5ZuPtVPyB.png'},progress:100} ,
{id:uniqueId('project-company-doioedalx-'),name:"Project 3",des:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",status:"Can",
startDate:"27/07/2023",startEnd:"10/08/2023",budget:"500000 DH",org:"https://cdn.logojoy.com/wp-content/uploads/2018/05/01104823/1454.png",chef:{name:"Mostafa Amine",icon:'https://api.mycoachpro.net/images/HH3PXgpo4qsZqTtlQYMJiWwA9LzXhfa5ZuPtVPyB.png'},progress:55} , 
{id:uniqueId('project-company-doioedalx-'),name:"Project 4",des:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",status:"In",
startDate:"27/09/2023",startEnd:"10/10/2023",budget:"600000 DH",org:"https://cdn.logojoy.com/wp-content/uploads/2018/05/01104832/1647.png",chef:{name:"Younes Zahfouf",icon:'https://api.mycoachpro.net/images/ya19W6ZUMktj0fAp0TEHMrCX8cqSPCCsK6uRaQ1I.png'},progress:44}]