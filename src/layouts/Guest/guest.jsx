import { Outlet , useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useContextProvider } from '../../context/contextProvider';



export default function Guestlayout() {
   
    const {token} = useContextProvider()
    const navigate = useNavigate();


    useEffect(()=>{
        if (    token !== 0 ) {
            navigate("/")
        }
      })
    
   
        return (
            <>
                <Outlet />
            
            </>
            
          
        );
    
  
   
  }
  