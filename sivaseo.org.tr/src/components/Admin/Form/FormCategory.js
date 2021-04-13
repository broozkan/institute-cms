import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import Swal from 'sweetalert2'
import getCategoryList from '../../../model/CategoryData'
import { Component } from 'react'
import { adminUrls } from '../../../lib/Admin/adminUrls'

class FormCategory extends Component {

    constructor() {
        super()

        this.state = {
            category_name: "",
            is_category_main: true,
            category_type: "",
            category_order_number: "",
            categories: [],
            posts: [],
            is_posts_loaded: false,
            is_categories_loaded: false,
            is_submitting: false
        }

        this.getCategories = this.getCategories.bind(this)
        this.getCategory = this.getCategory.bind(this)
        this.getPosts = this.getPosts.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (this.props.category_id) {
            this.getCategory()
        }

        this.getCategories()

    }



    getCategory = async () => {
        const category = await api.get('/categories/1', { params: { '_id': this.props.category_id }, headers: { 'auth-token': localStorage.getItem('auth-token') } })

        this.setState({
            category_name: category.data.docs[0].category_name,
            is_category_main: category.data.docs[0].is_category_main,
            category_type: category.data.docs[0].category_type,
            category_post_id: category.data.docs[0].category_post_id,
            category_external_url: category.data.docs[0].category_external_url,
            category_upper_category_id: category.data.docs[0].category_upper_category_id,
            category_order_number: category.data.docs[0].category_order_number
        })
    }

    getCategories = async (page = 1) => {

        const categories = await api.get('/categories/' + page, { headers: { 'auth-token': localStorage.getItem('auth-token') } })

        if (categories.data.docs) {
            this.setState({
                categories: categories.data.docs,
                is_categories_loaded: true
            })
        }




    }

    getPosts = async () => {

        const posts = await api.get('/post/list/1', { headers: { 'auth-token': localStorage.getItem('auth-token') } })

        this.setState({
            posts: posts.data.docs,
            is_posts_loaded: true
        })

    }




    // form material on change event
    handleOnChange = (e) => {

        if (e.target.type === "checkbox") {
            this.setState({
                [e.target.name]: e.target.checked,
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
        if (this.props.category_id) {
            submitResponse = await api.put(process.env.REACT_APP_API_ENDPOINT + '/categories/' + this.props.category_id, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        } else {
            submitResponse = await api.post(process.env.REACT_APP_API_ENDPOINT + '/categories', this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        }

        if (submitResponse.data.response) {
            Swal.fire({
                title: 'Başarılı!',
                text: "Kategori kaydedildi",
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
        // conditional rendering

        // loader queries for submit button
        let btnSaveInnerText = "Kaydet";
        if (this.state.is_submitting == true) {
            btnSaveInnerText = <span className="fa fa-spinner fa-spin"></span>
        }


        // sub categories input fields
        let upperCategories = ""
        if (this.state.is_category_main) {

        } else {

            let slctCategoriesContent = ""
            if (!this.state.is_categories_loaded) {
                slctCategoriesContent = <option value="" disabled selected> Yükleniyor </option>
            } else {
                slctCategoriesContent = this.state.categories.map((item) => {
                    return (
                        <option value={item._id}>{item.category_name}</option>
                    )
                })
            }
            upperCategories =

                <div className="position-relative row form-group">
                    <label for="category_upper_category_id" className="col-sm-4 col-form-label">Üst Kategori</label>
                    <div className="col-sm-8">
                        <select name="category_upper_category_id" value={this.state.category_upper_category_id} id="category_upper_category_id" onChange={this.handleOnChange} className="form-control">
                            {slctCategoriesContent}
                        </select>
                    </div>
                </div>

        }


        // render additional fields
        let additionalFieldsHtml = ""
        if (this.state.category_type == "to_post") {
            if (this.state.posts.length < 1) {
                this.getPosts()
            }

            let optionPosts = ""
            if (!this.state.is_posts_loaded) {
                optionPosts = <option value="" disabled>Yükleniyor...</option>
            } else {
                optionPosts = this.state.posts.map((item) => {
                    return (<option value={item._id}>{item.post_title}</option>)
                })
            }
            additionalFieldsHtml = (
                <>
                    <label for="category_post_id" className="col-sm-4 col-form-label">Yönlendirilecek Yazı</label>
                    <div className="col-sm-8">
                        <select className="form-control" id="category_post_id" onChange={this.handleOnChange} value={this.state.category_post_id} name="category_post_id">
                            <option value="" selected disabled>Seçiniz</option>
                            {optionPosts}
                        </select>
                    </div>

                </>
            )
        } else if (this.state.category_type == "external_link") {
            additionalFieldsHtml = (
                <>
                    <label for="category_name" className="col-sm-4 col-form-label">Yönlendirilecek Url</label>
                    <div className="col-sm-8">
                        <input className="form-control" onChange={this.handleOnChange} value={this.state.category_external_url} name="category_external_url" />
                    </div>
                </>
            )
        }




        return (
            <form className="" onSubmit={this.handleSubmit}>
                <div className="position-relative row form-group">
                    <label for="category_name" className="col-sm-4 col-form-label">Kategori Adı</label>
                    <div className="col-sm-8">
                        <input name="category_name" id="category_name" value={this.state.category_name} onChange={this.handleOnChange} required placeholder="Kategori adı giriniz" type="text" className="form-control" />
                    </div>
                </div>

                <div className="position-relative form-check">
                    <input name="is_category_main" id="is_category_main" type="checkbox" checked={this.state.is_category_main} onChange={this.handleOnChange} className="form-check-input" />
                    <label for="is_category_main" className="form-check-label">Alt kategori olmayacak</label>
                </div>
                {upperCategories}

                <fieldset class="position-relative form-group mt-3">
                    <div class="position-relative form-check">
                        <label class="form-check-label">
                            <input name="category_type" onChange={this.handleOnChange} value="to_post" checked={this.state.category_type === "to_post"} type="radio" class="form-check-input" />
                            Yazıya yönlendirme
                        </label>
                    </div>
                    <div class="position-relative form-check">
                        <label class="form-check-label">
                            <input name="category_type" onChange={this.handleOnChange} value="external_link" checked={this.state.category_type === "external_link"} type="radio" class="form-check-input" />
                            Harici Link
                        </label>
                    </div>
                    <div class="position-relative form-check">
                        <label class="form-check-label">
                            <input name="category_type" onChange={this.handleOnChange} value="category_list" checked={this.state.category_type === "category_list"} type="radio" class="form-check-input" />
                            Kategori İçerik Listesi
                        </label>
                    </div>
                    <div class="position-relative form-check">
                        <label class="form-check-label">
                            <input name="category_type" onChange={this.handleOnChange} value="announcement" checked={this.state.category_type === "announcement"} type="radio" class="form-check-input" />
                            İlan Kategorisi
                        </label>
                    </div>
                </fieldset>



                <div className="position-relative row form-group">
                    {additionalFieldsHtml}
                </div>
                <div className="position-relative row form-group">
                    <label for="category_order_number" className="col-sm-4 col-form-label">Kategori Sıralama Numarası *</label>
                    <div className="col-sm-8">
                        <input name="category_order_number" required id="category_order_number" value={this.state.category_order_number} onChange={this.handleOnChange} required placeholder="Kategori sıralama numarası giriniz" type="number" className="form-control" />
                    </div>
                </div>
                <div className="position-relative form-group float-right">
                    <a href={adminUrls.CATEGORY_LIST_VIEW} className="btn btn*default">Geri Dön</a>
                    <button className="btn btn-primary" type="submit"> {btnSaveInnerText} </button>
                </div>
            </form>
        )
    }


}

export default FormCategory