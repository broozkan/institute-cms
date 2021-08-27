import React, { useState, createContext, useEffect } from 'react'

export const UserContext = createContext()

export const UserContextWrapper = (props) => {


    const defaultValueHandler = () => {

        const token = localStorage.getItem('auth-token')
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            if (user.is_user_admin) {
                return true
            } else {
             //   window.location.href = '/admin/login/'
            }
        } else {
          //  window.location.href = '/admin/login/'
        }

    }


    const [isUserLoggedIn, setIsUserLoggedIn] = useState(defaultValueHandler())

    const user = {
        isUserLoggedIn,
        setIsUserLoggedIn
    }


    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )

}
