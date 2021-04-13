import React, { useContext } from 'react'
import Navbar from '../../../components/Admin/Navbar/Navbar'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import TableNotification from '../../../components/Admin/Table/TableNotification'
import { adminUrls } from '../../../lib/Admin/adminUrls'


const NotificationListView = () => {

	return (

		<>
			<Sidebar />
			<div id="page-content-wrapper">

				<Navbar />
				<div class="container-fluid page-inner-container">
					<div className="page-title">
						<h4>Bildirim Listesi</h4>
						<p>Yayında veya olmayan yazıları buradan görüntüleyebilir, işlem yapabilirsiniz</p>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div className="card">
								<div className="card-header">
									<a href={adminUrls.NEW_NOTIFICATION_VIEW} className="btn btn-primary"><span className="fa fa-plus"></span> Yeni Bildirim Ekle</a>
								</div>
								<div className="card-body">
									<TableNotification />

								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default NotificationListView