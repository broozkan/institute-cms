import React, { Component, useContext, useEffect, useState } from 'react'
import api from '../../../services/api'
import CategoryTag from '../../../components/Site/Link/CategoryLink'
import KeywordTag from '../../../components/Site/Keyword/Keyword'
import PageTitle from '../../../components/Site/PageTitle/PageTitle'
import LastFivePost from '../../../components/Site/Section/LastFivePostSection'
import CommonSpinner from '../../../components/Site/Spinner/CommonSpinner'
import CommentField from '../../../components/Site/Section/CommentSection'
import { SiteContext } from '../../../contexts/Site/SiteContext'
import Footer from '../../../components/Site/Footer/Footer'

const PostDetail = (props) => {

	const [state, setState] = useState({
		post: '',
		post_id: props.match.params.postId,
		is_post_loaded: false
	})

	useEffect(() => {
		getPostContent()
	}, [])


	const getPostContent = async () => {

		const postContent = await api.get('/posts/1', { params: { '_id': state.post_id }, headers: { 'auth-token': localStorage.getItem('auth-token') } })

		setState({
			...state,
			post: postContent.data.docs[0],
			is_post_loaded: true
		})
	}





	// post detail content rendering
	let postContentHtml = ""
	let postKeywordsHtml = ""
	let postCategoriesHtml = ""

	if (!state.is_post_loaded) {
		postContentHtml = <CommonSpinner />
	} else {

		// post categories render
		postCategoriesHtml = state.post.post_categories.map((item) => {
			return (
				<CategoryTag category={item} />
			)
		})

		// post keywords render
		postKeywordsHtml = state.post.post_keywords.split(',')
		postKeywordsHtml = postKeywordsHtml.map((item) => {
			return (
				<KeywordTag keyword={item} />
			)
		})



		// check post allowed for comment
		let commentSectionHtml = ""
		if (state.post.is_post_open_for_comment) {
			commentSectionHtml = <CommentField post={state.post} />
		}



		postContentHtml = (
			<>

				<div className="blog-content mt-15 mx-5">
					<ul className="list-inline date">
						{postCategoriesHtml}
						<li className="category-link">
							<i aria-hidden="true" className="fa fa-clock-o"></i>
							<a href="#"> {state.post.post_publish_date}</a>
						</li>
					</ul>
					<div className="post-content py-5">
						<div dangerouslySetInnerHTML={{ __html: state.post.post_content }} />

					</div>

					<div className="blog-tage border p-all-10 fix">
						<div className="tag-list custom-col-7">
							<ul className="widget-list tag">
								<li><label>Etiketler :</label></li>
								{postKeywordsHtml}
							</ul>
						</div>
						<div className="share-icone custom-col-3">
							<ul className="social-icon text-right">
								<li>
									<label>Paylaş :</label>
								</li>
								<li>
									<a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
								</li>
								<li>
									<a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
								</li>
								<li>
									<a href="#"><i className="fa fa-pinterest-p" aria-hidden="true"></i></a>
								</li>
								<li>
									<a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a>
								</li>
								<li>
									<a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
								<li>
									<a href="#"><i className="fa fa-skype" aria-hidden="true"></i></a>
								</li>
							</ul>
						</div>
					</div>

				</div>
				{commentSectionHtml}

			</>
		)
	}

	return (
		<>
			<PageTitle title={["Yazılar", state.post.post_title]} />
			<section id="page-content" className="page-wrapper page-body clear">
				<div className="section-area pb-70">
					<div className="container">
						<div className="row">
							<div className="col-lg-3 col-md-4 order-md-1 order-2">
								<div className="side-bare mt-0">

									<LastFivePost />

									<div className="side-widget fix">
										<div className="section-title mb-30">
											<h2> Etiketler</h2>
										</div>
										<ul className="widget-list tag">
											{postKeywordsHtml}

										</ul>
									</div>


								</div>
							</div>
							<div className="col-lg-9 col-md-8 order-md-2 order-1">
								<div className="allblog-list row">

									<div className="post-detail">

										{postContentHtml}
									</div>



								</div>
							</div>
						</div>
					</div>
				</div>

			</section>
		</>
	)


}

export default PostDetail