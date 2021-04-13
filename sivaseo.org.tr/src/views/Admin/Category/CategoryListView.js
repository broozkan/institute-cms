import React, { useContext } from 'react'
import Navbar from '../../../components/Admin/Navbar/Navbar'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import TableCategory from '../../../components/Admin/Table/TableCategory'
import { adminUrls } from '../../../lib/Admin/adminUrls'


const CategoryListView = () => {

	return (

		<>
			<Sidebar />
			<div id="page-content-wrapper">

				<Navbar />
				<div class="container-fluid page-inner-container">
					<div className="page-title">
						<h4>Kategori Listesi</h4>
						<p>Site içerisinin kategorilerini buradan görebilirsiniz</p>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div className="card">
								<div className="card-header">
									<a href={adminUrls.NEW_CATEGORY_VIEW} className="btn btn-primary"><span className="fa fa-plus"></span> Yeni Kategori Ekle</a>
								</div>
								<div className="card-body">
									<TableCategory />

								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CategoryListView