import React, { useContext, useState } from 'react'
import FormCategory from '../../../components/Admin/Form/FormCategory'
import Navbar from '../../../components/Admin/Navbar/Navbar'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import { adminUrls } from '../../../lib/Admin/adminUrls'


const UpdateCategoryView = (props) => {



	return (
		<>
			<Sidebar />

			<div id="page-content-wrapper">

				<Navbar />
				<div class="container-fluid page-inner-container">
					<div className="page-title">
						<h4>Kategoriyi Düzenleyin</h4>
						<p>Kategorinin içeriğini değiştirebilirsiniz</p>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div className="card">
								<div className="card-header">
									<a href={adminUrls.CATEGORY_LIST_VIEW} className="btn btn-primary"><span className="fa fa-plus"></span> Kategori Listesi</a>
								</div>
								<div className="card-body">
									<FormCategory category_id={props.match.params.categoryId} />

								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default UpdateCategoryView