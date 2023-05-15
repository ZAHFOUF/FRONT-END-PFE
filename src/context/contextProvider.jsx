/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import { createContext , useContext, useState } from "react";
import { AES, enc } from 'crypto-js';



const st = createContext({
    user:null,
    token:null
})





export const ContextProvider = ({children}) => {
    const session = JSON.parse(localStorage.getItem("user_session"))
    let tokenLocal
    let us


   
    if (session) {
       // eslint-disable-next-line vars-on-top
       const tk = AES.decrypt(session.st,"younes") 
       const userName = AES.decrypt(session.user.name,"younes") 
       const userEmail = AES.decrypt(session.user.email,"younes") 
       const rl = AES.decrypt(session.user.role,"younes") 
       const photo = session.user.icon
      





       tokenLocal = tk.toString(enc.Utf8)

       var userCrypte ={name:userName.toString(enc.Utf8),email:userEmail.toString(enc.Utf8),icon:photo}

       us = userCrypte

    }else{
        tokenLocal = 0
        us = ''

    }

    
    const [token,setToken] = useState(tokenLocal)

     const [user,setUser] = useState(us)


    const _setToken = (token)=>{
        setToken(token)
      
    }


   

    return(
       <st.Provider value={{
            user,
            token,
            _setToken,
            setUser
            
        }}> 
            {children}
        </st.Provider> 
    ) 

}

export const useContextProvider = () => useContext(st)