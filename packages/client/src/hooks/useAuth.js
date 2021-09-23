import React, { useReducer, useEffect, useContext, createContext } from 'react'
import axios from "axios"




const authContext = createContext()

export const useAuth = () => {
    return useContext(authContext)
}


export function useProvideAuth() {



    const signup = async (username, email, password) => {
        try{
            await axios.post("users/", {
                username: username,
                password: password,
                email: email,
            })
            //return await signin(username, password)
        } catch (error) {
            console.log(error)
        }
    }



    return {
        signup,
    }
}



