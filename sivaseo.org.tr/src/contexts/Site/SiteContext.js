import React, { useState, createContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const SiteContext = createContext()

export const SiteContextWrapper = (props) => {

    const location = useLocation()

    const [monthName, setMonthName] = useState('')
    const [dayName, setDayName] = useState('')
    const months = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık"
    ]


    const defaultValueHandler = () => {

        const pharmacistToken = localStorage.getItem('dashboard-auth-token')

        if (pharmacistToken) {
            return true
        } else {
            const splittedUrl = location.pathname.split('/')
            console.log(splittedUrl);
            if (splittedUrl[1] == "user") {
                if (splittedUrl[2] != "login") {
                    window.location.href = '/user/login'
                }
            }
            return false
        }
    }


    const [isPharmacistLoggedIn, setIsPharmacistLoggedIn] = useState(defaultValueHandler())

    const user = {
        isPharmacistLoggedIn,
        setIsPharmacistLoggedIn
    }

    useEffect(() => {
        let date = new Date()
        const currentMonth = date.getMonth()
        const currentDay = date.getDate()
        setMonthName(months[currentMonth])
        setDayName(currentDay)
        console.log(months);
    }, [])


    return (
        <SiteContext.Provider value={user, {monthName: monthName, dayName, dayName}}>
            {props.children}
        </SiteContext.Provider>
    )

}
