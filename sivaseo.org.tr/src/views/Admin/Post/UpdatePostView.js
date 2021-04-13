import React, { useContext, useState } from 'react'
import FormPost from '../../../components/Admin/Form/FormPost'
import Navbar from '../../../components/Admin/Navbar/Navbar'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import { adminUrls } from '../../../lib/Admin/adminUrls'


const UpdatePostView = (props) => {

	

	return (
		<>
			<Sidebar />

			<div id="page-content-wrapper">

				<Navbar />
				<div class="container-fluid page-inner-container">
					<div className="page-title">
						<h4>Yazıyı Düzenleyin</h4>
						<p>Yazının içeriğini değiştirebilirsiniz</p>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div className="card">
								<div className="card-header">
									<a href={adminUrls.POST_LIST_VIEW} className="btn btn-primary"><span className="fa fa-plus"></span> Yazı Listesi</a>
								</div>
								<div className="card-body">
									<FormPost post_id={props.match.params.postId} />

								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default UpdatePostView