import React, { useContext } from 'react'
import Navbar from '../../../components/Admin/Navbar/Navbar'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import TableUser from '../../../components/Admin/Table/TableUser'
import { adminUrls } from '../../../lib/Admin/adminUrls'


const UserListView = () => {

	return (

		<>
			<Sidebar />
			<div id="page-content-wrapper">

				<Navbar />
				<div class="container-fluid page-inner-container">
					<div className="page-title">
						<h4>Kullanıcı Listesi</h4>
						<p>Yayında veya olmayan yazıları buradan görüntüleyebilir, işlem yapabilirsiniz</p>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div className="card">
								<div className="card-header">
									<a href={adminUrls.NEW_USER_VIEW} className="btn btn-primary"><span className="fa fa-plus"></span> Yeni Kullanıcı Ekle</a>
								</div>
								<div className="card-body">
									<TableUser />

								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default UserListView