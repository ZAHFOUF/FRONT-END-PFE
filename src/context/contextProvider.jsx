/* eslint-disable no-unused-expressions */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import { createContext , useContext, useEffect, useState } from "react";
import { CircularProgress , Backdrop } from "@mui/material";
import { AES, enc } from 'crypto-js';

import { doc , getDoc } from "firebase/firestore";
import { db } from '../firebase.setting';
import axiosClient from "../api/axios";
import { Toast } from "../components/aleart";


const st = createContext({
    user:null,
    token:null,
    permissions:null
});





export const ContextProvider = ({children}) => {
    const session = JSON.parse(localStorage.getItem("user_session"))
    
    let tokenLocal = 0
    let us
  

   
    if (session) {
       // eslint-disable-next-line vars-on-top
       const tk = AES.decrypt(session.st,"younes") 
       tokenLocal = tk.toString(enc.Utf8)


    }

    
    const [token,setToken] = useState(tokenLocal)

     const [user,setUser] = useState(undefined)
     const [permissions,setPermissions] = useState([])
     const [open,setOpen] = useState(true)

     const [settings,setSettings] = useState({})


    const _setToken = (token)=>{
        setToken(token)
      
    }

    const  can = (permission) => {
        return permissions.includes(permission);
      }

      const  is = (role,not) => {

      const roleCheck =   user !== undefined ? role === user.role[0].name : false

      const response = not === true ? !roleCheck : roleCheck

      return response
        
      }

    useEffect(()=>{

        if(localStorage.getItem("user_session")){
            axiosClient.get("/api/user").then((e)=> {setUser(e.data.user) ; setPermissions(e.data.permissions) ; setOpen(false)}  ).catch(()=>{
                setOpen(false)
                localStorage.removeItem("user_session")
                Toast.fire({icon:"warning" , title:"session expired please login again !" , timer:3000})
                setTimeout(()=>{window.location.href = '/login'},3000)
                
            })

        }else{
            setOpen(false)

        }

      

        
        

    },[])



   

    return(
       <st.Provider value={{
            user,
            token,
            _setToken,
            setUser ,
            settings ,
            permissions ,
            setPermissions ,
            can,
            is
            
        }}>
             <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={open}
>
  <CircularProgress color="inherit" />
</Backdrop>
            {children}
        </st.Provider> 
    ) 

}

export const useContextProvider = () => useContext(st)