import React, { useContext } from 'react'
import Navbar from '../../../components/Admin/Navbar/Navbar'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import TableEducationVideoPlaylist from '../../../components/Admin/Table/TableEducationVideoPlaylist'
import { adminUrls } from '../../../lib/Admin/adminUrls'


const EducationVideoPlaylistListView = () => {

	return (

		<>
			<Sidebar />
			<div id="page-content-wrapper">

				<Navbar />
				<div class="container-fluid page-inner-container">
					<div className="page-title">
						<h4>Eğitim Videosu Listesi</h4>
						<p>Eğitim videolarını buradan görebilirsiniz</p>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div className="card">
								<div className="card-header">
									<a href={adminUrls.NEW_EDUCATION_VIDEO_PLAYLIST_VIEW} className="btn btn-primary"><span className="fa fa-plus"></span> Yeni Eğitim Videosu Listesi Ekle</a>
								</div>
								<div className="card-body">
									<TableEducationVideoPlaylist />

								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default EducationVideoPlaylistListView