import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import CommonSpinner from '../Spinner/CommonSpinner'
import PostLink from '../Link/PostLink'
import CategoryLink from '../Link/CategoryLink'


const RandomCategories = () => {

    const [state, setState] = useState({
        random_categories: [],
        is_random_categories_loaded: false
    })


    useEffect(() => {
        getRandomCategories()
    }, [])


    const getRandomCategories = async (page = 1) => {
        const randomCategories = await api.get('/categories/' + page, { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { limit: 5 } })

        setState({
            random_categories: randomCategories.data.docs,
            is_random_categories_loaded: true
        })
    }


    let randomCategoriesHtml = ""
    console.log(state);
    if (!state.is_random_categories_loaded) {
        randomCategoriesHtml = <CommonSpinner />
    } else {
        randomCategoriesHtml = state.random_categories.map((item) => {
            return (
                <CategoryLink category={item} />
            )
        })
    }

    return (
        <div class="side-widget">
            <div class="section-title mb-30">
                <h2> Kategoriler</h2>
            </div>
            <ul class="widget-list">
                {randomCategoriesHtml}
            </ul>
        </div>
    )
}


export default RandomCategories