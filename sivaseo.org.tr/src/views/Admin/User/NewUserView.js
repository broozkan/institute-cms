import React, { useContext, useState } from 'react'
import FormUser from '../../../components/Admin/Form/FormUser'
import Navbar from '../../../components/Admin/Navbar/Navbar'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import { adminUrls } from '../../../lib/Admin/adminUrls'


const NewUserView = () => {



	return (
		<>
			<Sidebar />

			<div id="page-content-wrapper">

				<Navbar />
				<div class="container-fluid page-inner-container">
					<div className="page-title">
						<h4>Yeni Kullanıcı Ekle</h4>
						<p>Yeni bir yazı yayınlayabilirsiniz</p>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div className="card">
								<div className="card-header">
									<a href={adminUrls.USER_LIST_VIEW} className="btn btn-primary"><span className="fa fa-plus"></span> Kullanıcı Listesi</a>
								</div>
								<div className="card-body">
									<FormUser />

								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default NewUserView