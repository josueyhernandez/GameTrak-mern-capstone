import React, { useReducer, useContext, createContext, useEffect } from 'react'
// import axios - refer to snippets useAuth hook for hints

const initialState = {
    id: null,
    username: null,
    image: null,
    games: null,
    currentGame: null
}
const userReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_USER':
            localStorage.setItem('User', JSON.stringify(action.info))
            return {
                ...state,
                id: action.info._id,
                username: action.info.username,
                image: action.info.image,
                games: action.info.games
            }
        case 'SELECT_GAME':
            localStorage.setItem('CurrentGame', JSON.stringify(action.info))
            return {
                ...state,
                currentGame: action.info
            }
        case 'LOGOUT':
            localStorage.clear('User')
            localStorage.clear('CurrentGame')
            return {
                id: null,
                username: null,
                image: null,
                games: null,
                currentGame: null
            }
        default:
            return state;
    }

}
const userContext = createContext()
export const useUser = () => {
    return useContext(userContext)
}
export default function ProvideUser({ children }) {
    const [state, dispatch] = useReducer(userReducer, initialState)
    return (
        <userContext.Provider value={{
            state,
            dispatch,
        }}>
            {children}
        </userContext.Provider>
    )
}

export const useProvideUser = () => {
    const { state, dispatch } = useUser();
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('User')) || false
        const savedCurrentGame = JSON.parse(localStorage.getItem('CurrentGame')) || false
        console.log(savedUser)
        if (savedUser) {
            dispatch({
                type: 'CHANGE_USER',
                info: savedUser,
            })
        }
        if (savedCurrentGame) {
            dispatch({
                type: 'SELECT_GAME',
                info: savedCurrentGame,
            })
        }
    }, [dispatch])

    //create functions that call to the backend with axios for frontend use
    return {
        state,
        dispatch,
        userReducer
    }
}