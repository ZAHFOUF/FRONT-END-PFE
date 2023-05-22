/* eslint-disable no-unused-vars */
import React,{ useState } from "react";


export const useForm = () => {

    const [state,setState] = useState()

    const handleChange = (e) =>{
        e.persist()
        setState(state => ({...state , [e.target.name] : e.target.value}))

    }






    return [state , handleChange ]






}