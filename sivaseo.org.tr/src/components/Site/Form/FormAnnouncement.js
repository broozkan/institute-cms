import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import api from '../../../services/api'
import { Link } from 'react-router-dom'
import { Component } from 'react'
import { siteUrls } from '../../../lib/Site/siteUrls'

class FormNewAnnouncement extends Component {

    constructor() {
        super()
        this.state = {
            announcement_title: '',
            announcement_description: '',
            is_announcement_public: true,
            announcement_category: {},
            is_submitting: false,
            categories: [],
            is_categories_loaded: false
        }
        this.getAnnouncementData = this.getAnnouncementData.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }

    async componentDidMount() {
        if (this.props.announcement_id) {
            this.getAnnouncementData()
        }

        const categories = await api.get('/categories/1', { params: { 'category_type': 'announcement' }, headers: { 'auth-token': localStorage.getItem('auth-token') } })

        this.setState({
            categories: categories.data.docs,
            is_categories_loaded: true
        })
    }


    getAnnouncementData = async () => {

        const announcementData = await api.get('/announcements/1', { params: { '_id': this.props.announcement_id }, headers: { 'auth-token': localStorage.getItem('auth-token') } })

        this.setState(announcementData.data.docs[0])
    }


    handleOnChange = (e) => {

        if (e.target.type === "checkbox") {
            this.setState({
                [e.target.name]: e.target.checked
            })
        } else if (e.target.type == "select-one") {
            let selectedCategory = {}
            this.state.categories.map((item) => {
                if (item._id == e.target.value) {
                    selectedCategory = item
                }
            })

            this.setState({
                announcement_category: selectedCategory
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }


    }


    handleOnSubmit = async (e) => {
        e.preventDefault()

        this.setState({
            is_submitting: true
        })



        let submitResponse = ''
        if (this.props.announcement_id) {
            submitResponse = await api.put('/announcements/' + this.props.announcement_id, this.state, { headers: { 'auth-token': localStorage.getItem('dashboard-auth-token') } })
        } else {
            submitResponse = await api.post('/announcements', this.state, { headers: { 'auth-token': localStorage.getItem('dashboard-auth-token') } })
        }


        if (submitResponse.data.response) {
            Swal.fire({
                title: 'Başarılı!',
                text: 'Kaydedildi',
                icon: 'success'
            })
        } else {
            alert(submitResponse.data.responseData)
            Swal.fire({
                title: 'Hata!',
                text: submitResponse.data.responseData,
                icon: 'error'
            })
        }

        this.setState({
            is_submitting: false
        })

    }


    render() {
        // render categories
        let categoriesJsx = ''
        if (this.state.is_categories_loaded) {
            categoriesJsx = this.state.categories.map((item) => {
                return (
                    <option value={item._id}>{item.category_name}</option>
                )
            })
        }

        return (

            <>
                <div className="section-title">
                    <h2>İlan Formu </h2>
                </div>
                <form id="form-new-announcement" className="fix mb-60 p-3" method="POST" onSubmit={this.handleOnSubmit}>
                    <div className="form-group">
                        <label for="announcement_title">İlan Başlığı</label>
                        <input className="form-control" name="announcement_title" onChange={this.handleOnChange} value={this.state.announcement_title} placeholder="İlan başlığını giriniz" required type="text" />
                    </div>
                    <div className="form-group">
                        <label for="announcement_description">İlan Açıklaması</label>
                        <input className="form-control" name="announcement_description" onChange={this.handleOnChange} value={this.state.announcement_description} placeholder="İlan açıklamasını giriniz" required type="text" />
                    </div>
                    <div className="form-group">
                        <label>İlan Kategorisi</label>
                        <select className="form-control" name="announcement_category" value={this.state.announcement_category._id} onChange={this.handleOnChange} required>
                            <option selected disabled>Kategori seçiniz</option>
                            {categoriesJsx}
                        </select>
                    </div>
                    <div className="form-check">
                        <input name="is_announcement_public" id="is_announcement_public" className="form-check-input" checked={this.state.is_announcement_public} onChange={this.handleOnChange} value={this.state.is_announcement_public} required type="checkbox" />
                        <label for="is_announcement_public" className="form-check-label">İlan Herkese Görünür Olsun</label>
                    </div>

                    <div className="form-group float-right text-right">
                        <Link to={siteUrls.ANNOUNCEMENT_LIST_VIEW} className="btn btn-outline-secondary mx-4"> <span className="fa fa-arrow-left"></span> Geri</Link>
                        <button className="btn btn-danger" type="submit"> <span className="fa fa-save"></span> Kaydet</button>
                    </div>
                </form>
            </>
        )
    }

}


export default FormNewAnnouncement