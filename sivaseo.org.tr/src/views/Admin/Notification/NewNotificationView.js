import React, { useContext, useState } from 'react'
import FormNotification from '../../../components/Admin/Form/FormNotification'
import Navbar from '../../../components/Admin/Navbar/Navbar'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import { adminUrls } from '../../../lib/Admin/adminUrls'


const NewNotificationView = () => {



	return (
		<>
			<Sidebar />

			<div id="page-content-wrapper">

				<Navbar />
				<div class="container-fluid page-inner-container">
					<div className="page-title">
						<h4>Yeni Bildirim Ekle</h4>
						<p>Yeni bir yazı yayınlayabilirsiniz</p>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div className="card">
								<div className="card-header">
									<a href={adminUrls.NOTIFICATION_LIST_VIEW} className="btn btn-primary"><span className="fa fa-plus"></span> Bildirim Listesi</a>
								</div>
								<div className="card-body">
									<FormNotification />

								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default NewNotificationView