import axios  from 'axios'
import { AES, enc } from 'crypto-js';


const axiosClient =  axios.create({
    baseURL:"https://api.mycoachpro.net",
    withCredentials:true,
    
})




axiosClient.interceptors.request.use((config)=>{
    
     if ( localStorage.getItem("user_session")) {
        const session =JSON.parse(localStorage.getItem("user_session"))

        const token = AES.decrypt(session.st,"younes")
        const detoken = token.toString(enc.Utf8)
        config.headers.Authorization = `Bearer ${detoken}`
     }

     return config
   
})


export default axiosClient