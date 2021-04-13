import React, {useState, createContext, useEffect} from 'react'

export const UserContext = createContext()

export const UserContextWrapper = (props) => {

    
    const defaultValueHandler = () => {

        const user = localStorage.getItem('auth-token')

        if(user){
            return true
        }else{
            window.location.href='/admin/login/'
        } 
    }


    const [isUserLoggedIn, setIsUserLoggedIn] = useState(defaultValueHandler())

    const user = {
        isUserLoggedIn,
        "broozkannnn":"boooo",
        setIsUserLoggedIn
    }


    return(
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )

}
