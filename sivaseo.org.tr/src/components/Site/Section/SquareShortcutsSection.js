import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import CommonSpinner from '../Spinner/CommonSpinner'
import PostLink from '../Link/PostLink'
import CategoryLink from '../Link/CategoryLink'
import SquareShortcutLink from '../Link/SquareShortcutLink'


const SquareShortcuts = () => {

    const [state, setState] = useState({
        square_shortcuts: [],
        is_square_shortcuts_loaded: false
    })


    useEffect(() => {
        getSquareShortcuts()
    }, [])


    const getSquareShortcuts = async () => {
        const squareShortcuts = await api.get('/shortcut/list/', { headers: { 'auth-token': localStorage.getItem('auth-token') } })

        setState({
            square_shortcuts: squareShortcuts.data,
            is_square_shortcuts_loaded: true
        })
    }


    let squareShortcutsHtml = ""
    if (!state.is_square_shortcuts_loaded) {
        squareShortcutsHtml = <CommonSpinner />
    } else {
        squareShortcutsHtml = state.square_shortcuts.map((item) => {
            return (
                <div className="col-md-12 col-3 px-1">
                    <SquareShortcutLink shortcut={item} />
                </div>
            )
        })
    }

    return (
        <div class="side-widget square-shortcuts-section">
            <div class="section-title mb-30">
                <h2> Kısayollar</h2>
            </div>
            <div className="row p-2">
                {squareShortcutsHtml}
            </div>
        </div>
    )
}


export default SquareShortcuts