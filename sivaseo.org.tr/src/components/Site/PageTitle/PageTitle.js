import React from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'



const pageTitle = (props) => {

	const pageTitleHtml = props.title.map((item) => {
		return(
			<li><span>{item}</span></li>
		)
	})
	
    return(
        <div class="page-title-area mt-120">
				<div class="container">
					<div class="row">
						<div class="col-lg-12">
							<div class="title-inner">
								<h1>{props.title[props.title.length-1]}</h1>
								<ul class="paging-title">
									<li><a class="home" href="/">Anasayfa</a></li>
									{pageTitleHtml}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
    )
}


export default pageTitle