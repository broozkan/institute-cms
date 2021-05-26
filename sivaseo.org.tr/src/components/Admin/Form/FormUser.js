import React, { Component, useEffect, useState } from 'react'
import api from '../../../services/api'
import Swal from 'sweetalert2'
import { adminUrls } from '../../../lib/Admin/adminUrls';
import SelectPharmacy from '../Select/SelectPharmacy';

class FormUser extends Component {




    constructor() {
        super()

        this.state = {
            user_name: '',
            user_password: '',
            user_email: '',
            user_pharmacy: {},
            user_redirect_url: '',
            user_permissions: []
        }

        this.getUser = this.getUser.bind(this)
    }

    async componentDidMount() {

        if (this.props.user_id) {
            this.getUser()
        }

    }





    getUser = async () => {

        const user = await api.get('/users/1', { params: { '_id': this.props.user_id }, headers: { 'auth-token': localStorage.getItem('auth-token') } })


        this.setState({
            user_name: user.data.docs[0].user_name,
            user: user.data.docs[0].user,
            user_permissions: user.data.docs[0].user_permissions
        })


    }




    // form material on change event
    handleOnChange = async (e) => {
        console.log(e.target.name);

        if (e.target.type === "checkbox") {
            let user_permissions = this.state.user_permissions

            if (user_permissions.indexOf(e.target.value) > -1) {
                console.log(user_permissions.indexOf(e.target.value));
                await user_permissions.slice(user_permissions.indexOf(e.target.value), 1)
            } else {
                user_permissions.push(e.target.value)
            }


            this.setState({
                user_permissions: user_permissions
            })
        } else if (e.target.name == "select_pharmacy") {
            this.setState({
                user_pharmacy: e.target.lastvalue
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }



    handleSubmit = async (e) => {
        e.preventDefault()




        let submitResponse = '';
        if (this.props.user_id) {
            submitResponse = await api.put(process.env.REACT_APP_API_ENDPOINT + '/users/' + this.props.user_id, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        } else {
            submitResponse = await api.post(process.env.REACT_APP_API_ENDPOINT + '/users', this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        }

        if (submitResponse.data.response) {
            Swal.fire({
                title: 'Başarılı!',
                text: "Kullanıcı kaydedildi",
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



        console.log(this.state.user_permissions);
        return (
            <form className="" onSubmit={this.handleSubmit}>
                <div className="position-relative row form-group">
                    <label for="user_name" className="col-sm-4 col-form-label">Kullanıcı Adı Soyadı</label>
                    <div className="col-sm-8">
                        <input name="user_name" id="user_name" value={this.state.user_name} onChange={this.handleOnChange} required placeholder="Kullanıcı adı soyadı giriniz" type="text" className="form-control" />
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <label for="user_password" className="col-sm-4 col-form-label">Kullanıcı Parolası</label>
                    <div className="col-sm-8">
                        <input name="user_password" id="user_password" value={this.state.user_password} onChange={this.handleOnChange} required placeholder="Kullanıcı parolası giriniz" type="password" className="form-control" />
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <label for="user_email" className="col-sm-4 col-form-label">Kullanıcı E-posta Adresi <sup>Sisteme giriş için kullanılacaktır</sup></label>
                    <div className="col-sm-8">
                        <input name="user_email" id="user_email" value={this.state.user_email} onChange={this.handleOnChange} required placeholder="Kullanıcı e-posta adresi giriniz" type="email" className="form-control" />
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <label for="user_pharmacy" className="col-sm-4 col-form-label">Kullanıcı Eczanesi </label>
                    <div className="col-sm-8">
                        <SelectPharmacy onChange={this.handleOnChange} value={this.state.user_pharmacy._id} />
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <label for="user_pharmacy" className="col-sm-4 col-form-label">Kullanıcı izinleri </label>
                    <div className="col-sm-8">
                        <div class="form-check mt-3">
                            <input class="form-check-input" id="grant_user_permission" onChange={this.handleOnChange} name="user_permissions" type="checkbox" value="grant_user_permission" />
                            <label class="form-check-label" for="grant_user_permission">
                                Kullanıcı ekleyebilir, düzenleyebilir
                            </label>
                        </div>
                        <div class="form-check mt-3">
                            <input class="form-check-input" id="grant_post_permission" onChange={this.handleOnChange} name="user_permissions" type="checkbox" value="grant_post_permission" />
                            <label class="form-check-label" for="grant_post_permission">
                                Duyuru paylaşabilir, düzenleyebilir
                            </label>
                        </div>
                        <div class="form-check mt-3">
                            <input class="form-check-input" id="grant_category_permission" onChange={this.handleOnChange} name="user_permissions" type="checkbox" value="grant_category_permission" />
                            <label class="form-check-label" for="grant_category_permission">
                                Kategori ekleyebilir, düzenleyebilir
                            </label>
                        </div>
                        <div class="form-check mt-3">
                            <input class="form-check-input" id="grant_education_video_playlist_permission" onChange={this.handleOnChange} name="user_permissions" type="checkbox" value="grant_education_video_playlist_permission" />
                            <label class="form-check-label" for="grant_education_video_playlist_permission">
                                Eğitim videoları ekleyebilir, düzenleyebilir
                            </label>
                        </div>
                        <div class="form-check mt-3">
                            <input class="form-check-input" id="grant_notification_permission" onChange={this.handleOnChange} name="user_permissions" type="checkbox" value="grant_notification_permission" />
                            <label class="form-check-label" for="grant_notification_permission">
                                Bildirim gönderebilir, düzenleyebilir
                            </label>
                        </div>
                        <div class="form-check mt-3">
                            <input class="form-check-input" id="grant_popup_permission" onChange={this.handleOnChange} name="user_permissions" type="checkbox" value="grant_popup_permission" />
                            <label class="form-check-label" for="grant_popup_permission">
                                Açılış mesajı yayınlayabilir, düzenleyebilir
                            </label>
                        </div>
                    </div>
                </div>

                <div className="position-relative form-group float-right mt-3">
                    <a href={adminUrls.USER_LIST_VIEW} className="btn btn*default">Geri Dön</a>
                    <button className="btn btn-primary" type="submit"> Kaydet </button>
                </div>


            </form>
        )
    }


}

export default FormUser