import React, { Component, useEffect, useState } from 'react'
import getPostList from '../../../model/PostData'
import getCategoryList from '../../../model/CategoryData'
import PageTitle from '../../../components/Site/PageTitle/PageTitle'
import LastFivePost from '../../../components/Site/Section/LastFivePostSection'
import pageTitle from '../../../components/Site/PageTitle/PageTitle'
import RandomCategories from '../../../components/Site/Section/RandomCategoriesSection'
import SquareShortcuts from '../../../components/Site/Section/SquareShortcutsSection'
import api from '../../../services/api'
import { propTypes } from 'react-bootstrap/esm/Image'
import CommonSpinner from '../../../components/Site/Spinner/CommonSpinner'
import CardPostMiddle from '../../../components/Site/Card/CardPostMiddle'

const CategoryDetail = (props) => {
	console.log("okofk");

	const [state, setState] = useState({
		posts: [],
		is_posts_loaded: false
	})


	useEffect(() => {
		getCategoryPosts()
	}, [])



	const getCategoryPosts = async (page = 1) => {

		const categoryPosts = await api.get('/posts/' + page, { params: { 'post_categories.category_name': props.match.params.categoryName }, headers: { 'auth-token': localStorage.getItem('auth-token') } })

		setState({
			...state,
			posts: categoryPosts.data.docs,
			is_posts_loaded: true
		})
	}

	let categoryPostsHtml = ''
	if (!state.is_posts_loaded) {
		categoryPostsHtml = <CommonSpinner />
	} else {
		if (state.posts.length < 1) {
			categoryPostsHtml = (
				<div className="col-lg-12 mt-5">
					<h4 className="text-center">İçerik bulunamadı</h4>

				</div>
			)
		} else {
			categoryPostsHtml = state.posts.map((item) => {
				return (
					<CardPostMiddle post={item} />
				)
			})
		}

	}

	return (
		<>
			<PageTitle title={["Kategoriler", "Kategori Listesi"]} />
			<section id="page-content" class="page-wrapper  clear">
				<div class="section-area pb-70">
					<div class="container">
						<div class="row">
							<div class="col-lg-3 col-md-4 order-2">
								<div class="side-bare mt-0">

									<RandomCategories />



								</div>
							</div>
							<div class="col-lg-9 col-md-8 order-1">
								<div class="allblog-list row">

									{categoryPostsHtml}

								</div>
							</div>
						</div>
					</div>
				</div>


			</section>
		</>
	)



}

export default CategoryDetail