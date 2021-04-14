import React, { Component, useEffect, useState } from 'react'
import api from '../../../services/api'
import Swal from 'sweetalert2'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { adminUrls } from '../../../lib/Admin/adminUrls';

class FormNotification extends Component {




    constructor() {
        super()

        this.state = {
            notification_title: '',
            notification: '',
            users: [],
            notification_users: [],
            is_users_loaded: false
        }

        this.getNotification = this.getNotification.bind(this)
        this.getUsers = this.getUsers.bind(this)
    }

    async componentDidMount() {

        await this.getUsers()


        if (this.props.notification_id) {
            this.getNotification()
        }


    }



    handleGetUsers = () => {
        this.getUsers()
    }

    getUsers = async (page = 1) => {


        const users = await api.get('/users/' + page, { headers: { 'auth-token': localStorage.getItem('auth-token') } })

        if (users.data.docs) {
            this.setState({
                users: users.data.docs,
                is_users_loaded: true
            })
        }




    }

    getNotification = async () => {

        const notification = await api.get('/notifications/1', { params: { '_id': this.props.notification_id }, headers: { 'auth-token': localStorage.getItem('auth-token') } })


        this.setState({
            notification_title: notification.data.docs[0].notification_title,
            notification: notification.data.docs[0].notification,
            notification_users: notification.data.docs[0].notification_users
        })


    }




    // form material on change event
    handleOnChange = (e) => {


        if (e.target.type === "checkbox") {

            let notificationUsers

            if (e.target.checked === true) {
                notificationUsers = this.state.notification_users


                this.state.users.map((item, index) => {
                    if (e.target.dataset.id == item._id) {
                        notificationUsers.push(
                            {
                                user: item,
                                is_user_read: false
                            }
                        )

                    }
                })
            } else {
                notificationUsers = new Array()

                this.state.notification_users.map((item, index) => {
                    if (e.target.dataset.id != item._id) {
                        notificationUsers.push(item)

                    }
                })

            }


            this.setState({
                notification_users: notificationUsers
            })


        } else if (e.target.type == "file") {
            this.setState({
                [e.target.name]: e.target.files[0]
            })
        } else {
            console.log(e.target.value);
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    handleCkEditorOnchange = (event, editor) => {

        const notificationContent = editor.getData()

        this.setState({
            notification: notificationContent
        })



    }

    handleSubmit = async (e) => {
        e.preventDefault()




        let submitResponse = '';
        if (this.props.notification_id) {
            submitResponse = await api.put(process.env.REACT_APP_API_ENDPOINT + '/notifications/' + this.props.notification_id, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        } else {
            submitResponse = await api.post(process.env.REACT_APP_API_ENDPOINT + '/notifications', this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        }

        if (submitResponse.data.response) {
            Swal.fire({
                title: 'Başarılı!',
                text: "Bildirim kaydedildi",
                icon: 'success'
            })
        } else {
            Swal.fire({
                title: 'Hata!',
                text: submitResponse.data.responseData,
                icon: 'error'
            })
        }


    }



    render() {

        /* users field */
        let usersHtml = ""
        if (this.state.is_users_loaded) {
            usersHtml = this.state.users.map((item, index) => {

                let checked = false
                this.state.notification_users.map((notificationUserItem) => {
                    if (item._id == notificationUserItem.user._id) {
                        checked = true
                    }
                })


                return (
                    <>
                        <div class={"form-check"}>
                            <input class="form-check-input" checked={checked} data-index={index} data-id={item._id} onChange={this.handleOnChange} type="checkbox" value="" id={item._id} />
                            <label class="form-check-label" for={item._id}>
                                {item.user_name}
                            </label>
                        </div>
                    </>
                )

            })
        }
        console.log(this.state);
        return (
            <form className="" onSubmit={this.handleSubmit}>
                <div className="position-relative row form-group">
                    <label for="notification_title" className="col-sm-4 col-form-label">Bildirim Başlığı</label>
                    <div className="col-sm-8">
                        <input name="notification_title" id="notification_title" value={this.state.notification_title} onChange={this.handleOnChange} required placeholder="Bildirim başlığı giriniz" type="text" className="form-control" />
                    </div>
                </div>

                <div className="users">
                    {usersHtml}
                </div>
                <CKEditor
                    editor={ClassicEditor}

                    onInit={editor => {
                        editor.setData(this.state.notification)
                    }}

                    config={
                        {
                            ckfinder: {
                                uploadUrl: process.env.REACT_APP_API_ENDPOINT + '/file/upload'
                            }
                        }
                    }

                    data={this.state.notification}
                    onChange={this.handleCkEditorOnchange}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />


                <div className="position-relative form-group float-right mt-3">
                    <a href={adminUrls.NOTIFICATION_LIST_VIEW} className="btn btn*default">Geri Dön</a>
                    <button className="btn btn-primary" type="submit"> Kaydet </button>
                </div>


            </form>
        )
    }


}

export default FormNotification