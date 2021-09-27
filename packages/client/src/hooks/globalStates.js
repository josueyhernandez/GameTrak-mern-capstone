import React, { useReducer, useContext, createContext, useEffect } from 'react'
const initialState = {
    username: null,
    image: null
}
const reducer = (state, action) =>{
    switch(action){
        case 'CHANGE_USER':
            return state
    }

}
const userContext = createContext()
export default function ProvideUser(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <userContext.Provider value={{
                state,
                dispatch,
            }}>
                {props.children}
        </userContext.Provider>
    )
}

