import React, { Component } from 'react'
import getUserList from '../../data/UserData'
import getPermissionList from '../../data/PermissionData'

import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import getPharmacyList from '../../data/PharmacyData'
import TableContentSpinner from '../Common/CommonSpinner'

class updateUser extends React.Component {

    constructor() {
        super()
        this.state = {
            permissions: [],
            pharmacies: [],
            isLoaded: false,
            is_pharmacies_loaded: false,
            is_permissions_loaded: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
    }

    async componentWillMount() {
        // get user list
        await getUserList(this.props.match.params.userId, (userData) => {
            this.setState(userData)
        })

        // get permissions 
        await getPermissionList("", (data) => {
            this.setState({
                permissions: data,
                is_permissions_loaded: true
            });

        })

        // pharmacies
        await getPharmacyList('', (data) => {
            this.setState({
                pharmacies: data,
                is_pharmacies_loaded: true
            })
        })
    }


    // form material on change event
    handleOnChange(e) {
        
        if(e.target.type === 'checkbox'){
            const lastPermissions = this.state.permissions.map((item,index)=>{
                if(index == e.target.dataset.index){
                    item.permission_state = e.target.checked
                }
                return item
            })
            this.setState({
                user_permissions : lastPermissions
            })

        }else{
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }
    // form materials on change event end


    // form submit
    async handleSubmit(e) {

        e.preventDefault()
        this.setState({
            is_submitting: true
        })


        const formData = this.state
     
        await axios.put(process.env.REACT_APP_API_ENDPOINT+'/user/update/'+this.props.match.params.userId, { formData })
            .then(res => {
                if (res.data.response == true) {
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Kullanıcı düzenlendi',
                        icon: 'success',
                        confirmButtonText: 'Geri'
                    })
                } else {
                    Swal.fire({
                        title: 'Hata!',
                        text: res.data.responseData,
                        icon: 'error',
                        confirmButtonText: 'Geri'
                    })
                }

            })

        this.setState({
            is_submitting: false
        })
    }


    render() {

        // loader queries for submit button
        let btnSaveInnerText = "Kaydet";
        if (this.state.is_submitting == true) {
            btnSaveInnerText = <span className="fa fa-spinner fa-spin"></span>
        }


       

         // pharmacy options
         let slctPharmacyListContent = ""
         if(this.state.is_pharmacies_loaded == false){
             slctPharmacyListContent = <option disabled selected value="">Yükleniyor...</option>
         }else{
             slctPharmacyListContent = this.state.pharmacies.map((item, index)=>{
                 return(
                     <option value={item._id} >{item.pharmacy_name}</option>
                 )
             })
         }

          // user permissions with mapping
        let userPermissions = ""
        userPermissions = this.state.permissions.map((item, index)=>{
    

            if(this.state.is_permissions_loaded){
                return(
                    <div className="position-relative form-check">
                        <input name={this.state.permissions[index]['permission_model_name']} data-index={index} id={this.state.permissions[index]['permission_model_name']} checked={this.state.user_permissions[index]['permission_state']} type="checkbox"  onChange={this.handleOnChange} className="form-check-input" />
                        <label for={this.state.permissions[index]['permission_model_name']} className="form-check-label">{item.permission_verbose_name}</label>
                    </div>
                )
            }else{
                return(
                    <TableContentSpinner />
                )
            }
            
        })
        

        return (
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <div className="app-page-title">
                        <div className="page-title-wrapper">
                        <div className="page-title-heading">
                                <div className="row">
                                    <div className="col-lg-12">
                                        Kullanıcıyı Düzenle
                                                <div className="page-title-subheading">
                                            Kullanıcı bilgilerini düzenleyin
                                                </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <Link to="/user/user-list" className="btn btn-primary"> <span className="fa fa-list"></span> Kullanıcı Listesi</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Kullanıcı Bilgileri</h5>
                            <div className="row">
                                <div className="col-lg-6">
                                    <form className="" onSubmit={this.handleSubmit}>
                                        <div className="position-relative row form-group">
                                            <label for="user_name" className="col-sm-4 col-form-label">Ad Soyad</label>
                                            <div className="col-sm-8">
                                                <input name="user_name" id="user_name" value={this.state.user_name} onChange={this.handleOnChange} required placeholder="Kullanıcı adı soyadı" type="text" className="form-control" />
                                            </div>
                                        </div>

                                        <div className="position-relative row form-group">
                                            <label for="user_username" className="col-sm-4 col-form-label">Kullanıcı Adı</label>
                                            <div className="col-sm-8">
                                                <input name="user_username" id="user_username" required value={this.state.user_username} onChange={this.handleOnChange} placeholder="Giriş kullanıcı adı" type="text" className="form-control" />
                                            </div>
                                        </div>

                                        <div className="position-relative row form-group">
                                            <label for="user_password" className="col-sm-4 col-form-label">Parola</label>
                                            <div className="col-sm-8">
                                                <input name="user_password" id="user_password" required value={this.state.user_password} onChange={this.handleOnChange} placeholder="Giriş parolası" type="password" className="form-control" />
                                            </div>
                                        </div>

                                        <div className="position-relative row form-group">
                                            <label for="user_password_repeat" className="col-sm-4 col-form-label">Parola (Tekrar)</label>
                                            <div className="col-sm-8">
                                                <input name="user_password_repeat" id="user_password_repeat" required value={this.state.user_password_repeat} onChange={this.handleOnChange} placeholder="Giriş parolası (tekrar)" type="password" className="form-control" />
                                            </div>
                                        </div>



                                        <div className="position-relative row form-group">
                                            <label for="user_email" className="col-sm-4 col-form-label">E-Posta</label>
                                            <div className="col-sm-8">
                                                <input name="user_email" id="user_email" required value={this.state.user_email} onChange={this.handleOnChange} placeholder="Kullanıcı E-posta adresi" type="email" className="form-control" />
                                            </div>
                                        </div>

                                        <div className="position-relative row form-group">
                                            <label for="user_pharmacy_id" className="col-sm-4 col-form-label">Kullanıcı Eczanesi</label>
                                            <div className="col-sm-8">
                                                <select name="user_pharmacy_id" value={this.state.user_pharmacy_id} onChange={this.handleOnChange} id="user_pharmacy_id" className="form-control">
                                                    {slctPharmacyListContent}
                                                </select>
                                            </div>
                                        </div>

                                        {userPermissions}

                                        <div className="position-relative form-group float-right">
                                            <Link to="/user/user-list" className="btn btn*default">Geri Dön</Link>
                                            <button className="btn btn-primary" onClick={this.btnSaveHandle} type="submit"> {btnSaveInnerText} </button>
                                        </div>


                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default updateUser