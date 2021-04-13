import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import ButtonDelete from '../Button/ButtonDelete'
import Pagination from '../Pagination/Pagination'
import CommonSpinner from '../Spinner/CommonSpinner'
import { Link } from 'react-router-dom'
import { Component } from 'react'
import { siteUrls } from '../../../lib/Site/siteUrls'


class TableAnnouncement extends Component {

    constructor() {
        super()

        this.state = {
            announcements: [],
            pagination_info: '',
            filters: {},
            is_announcements_loaded: false,
        }
        this.getAnnouncements = this.getAnnouncements.bind(this)
    }


    async componentDidMount() {
        console.log(this.props);
        if (this.props.params) {
            await this.setState({
                filters: this.props.params
            })
        }
        this.getAnnouncements(1)

    }



    getAnnouncements = async (page = 1, filters = {}) => {
        this.setState({
            is_announcements_loaded: false
        })

        const announcements = await api.get('/announcements/' + page, { params: this.state.filters, headers: { 'auth-token': localStorage.getItem('auth-token') } })

        this.setState({
            announcements: announcements.data.docs,
            pagination_info: announcements.data,
            is_announcements_loaded: true
        })
    }


    render() {

        // render table
        let tableAnnouncementHtml = ''
        if (!this.state.is_announcements_loaded) {
            tableAnnouncementHtml = <CommonSpinner />
        } else {
            const user = JSON.parse(localStorage.getItem('user'))


            // render table content
            tableAnnouncementHtml = this.state.announcements.map((item) => {

                let updateButtonHtml = ''
                let deleteButtonHtml = ''
                if (user._id == item.announcement_user._id) {
                    updateButtonHtml = <Link to={`${siteUrls.UPDATE_ANNOUNCEMENT_VIEW}/${item._id}`} className="float-right"> <span className="fa fa-edit"></span> Düzenle</Link>

                    deleteButtonHtml = <ButtonDelete model_name="announcements" _id={item._id} />

                }
                return (
                    <tr>
                        <td>{item.announcement_title}</td>
                        <td>{item.announcement_description}</td>
                        <td>
                            {updateButtonHtml}
                            {deleteButtonHtml}
                        </td>
                    </tr>
                )
            })



        }

        return (
            <>
                <table className="table table-striped table-bordered">
                    <thead>
                        <th>İlan Başlığı</th>
                        <th>İlan Açıklaması</th>
                        <th>#</th>
                    </thead>
                    <tbody>
                        {tableAnnouncementHtml}
                    </tbody>
                </table>
                <Pagination object={this.state.pagination_info} onClick={this.getAnnouncements} />

            </>
        )
    }





}


export default TableAnnouncement