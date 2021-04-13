import React, { Component, useEffect, useState } from 'react'
import getShortcutList from '../../model/ShortcutData'
import { renderSquareShortcuts } from '../../controllers/Shortcut/ShortcutController'
import api from '../../../services/api'

const ShortcutSquare = () => {

    const [state, setState] = useState({
        shortcuts: [],
        is_shortcuts_loaded: false
    })


    useEffect(() => {
        getShortcutList()
    }, [])

    const getShortcutList = async () => {
        const shortcutData = await api.get('/shortcut/list', { headers: { 'auth-token': localStorage.getItem('auth-token') } })

        setState({
            shortcuts: shortcutData.data,
            is_shortcuts_loaded: true
        })
    }



    let squareShortcutsHtml = ''
    if (!state.is_shortcuts_loaded) {
        squareShortcutsHtml = <span className="fa fa-spin fa-spinner fa-3x text-center"></span>
    } else {
        squareShortcutsHtml = state.shortcuts.map((item, index) => {
            console.log(item);
            let className = ""
            if (index == 9) {
                className = "mt-4"
            }

            return (

                <a href={item.shortcut_url} target="_blank">
                    <button className={className + " btn btn-lg mt-1 btn-default text-left "}>
                        {item.shortcut_name}
                    </button>
                </a>

            )
        })

    }

    return (
        <div className="shortcuts">
            <div className="btn-group-vertical link-group w-100">
                <h4>Kısayollar</h4>
                {squareShortcutsHtml}
            </div>
        </div>

    )

}

export default ShortcutSquare