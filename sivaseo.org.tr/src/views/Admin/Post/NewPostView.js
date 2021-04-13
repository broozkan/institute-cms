import React, { useContext, useState } from 'react'
import FormPost from '../../../components/Admin/Form/FormPost'
import Navbar from '../../../components/Admin/Navbar/Navbar'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import { adminUrls } from '../../../lib/Admin/adminUrls'


const NewPostView = () => {



	return (
		<>
			<Sidebar />

			<div id="page-content-wrapper">

				<Navbar />
				<div class="container-fluid page-inner-container">
					<div className="page-title">
						<h4>Yeni Yazı Ekle</h4>
						<p>Yeni bir yazı yayınlayabilirsiniz</p>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div className="card">
								<div className="card-header">
									<a href={adminUrls.POST_LIST_VIEW} className="btn btn-primary"><span className="fa fa-plus"></span> Yazı Listesi</a>
								</div>
								<div className="card-body">
									<FormPost />

								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default NewPostView