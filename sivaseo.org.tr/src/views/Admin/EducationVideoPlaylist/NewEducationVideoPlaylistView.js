import React, { useContext, useState } from 'react'
import FormEducationVideoPlaylist from '../../../components/Admin/Form/FormEducationVideoPlaylist'
import Navbar from '../../../components/Admin/Navbar/Navbar'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import { adminUrls } from '../../../lib/Admin/adminUrls'


const NewEducationVideoPlaylistView = () => {



	return (
		<>
			<Sidebar />

			<div id="page-content-wrapper">

				<Navbar />
				<div class="container-fluid page-inner-container">
					<div className="page-title">
						<h4>Yeni Eğitim Videosu Listesi Ekle</h4>
						<p>Yeni bir yazı yayınlayabilirsiniz</p>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div className="card">
								<div className="card-header">
									<a href={adminUrls.EDUCATION_VIDEO_PLAYLIST_LIST_VIEW} className="btn btn-primary"><span className="fa fa-plus"></span> Eğitim Videosu Listesi Listesi</a>
								</div>
								<div className="card-body">
									<FormEducationVideoPlaylist />

								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default NewEducationVideoPlaylistView