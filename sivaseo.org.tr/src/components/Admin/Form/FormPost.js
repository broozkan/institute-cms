import React, { Component, useEffect, useState } from 'react'
import api from '../../../services/api'
import Swal from 'sweetalert2'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { adminUrls } from '../../../lib/Admin/adminUrls';

class FormPost extends Component {




    constructor() {
        super()

        this.state = {
            post_title: '',
            post_alternative_title: '',
            post_state: '',
            is_post_shown_on_slider: '',
            is_post_open_for_comment: '',
            post_keywords: '',
            post_content: '',
            categories: [],
            post_categories: [],
            is_categories_loaded: false
        }

        this.getPost = this.getPost.bind(this)
        this.getCategories = this.getCategories.bind(this)
    }

    async componentDidMount() {

        await this.getCategories()


        if (this.props.post_id) {
            this.getPost()
        }


    }



    handleGetCategories = () => {
        this.getCategories()
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

    getPost = async () => {

        const post = await api.get('/posts/1', { params: { '_id': this.props.post_id }, headers: { 'auth-token': localStorage.getItem('auth-token') } })


        this.setState({
            post_title: post.data.docs[0].post_title,
            post_alternative_title: post.data.docs[0].post_alternative_title,
            post_state: post.data.docs[0].post_state,
            is_post_shown_on_slider: post.data.docs[0].is_post_shown_on_slider,
            is_post_open_for_comment: post.data.docs[0].is_post_open_for_comment,
            post_keywords: post.data.docs[0].post_keywords,
            post_categories: post.data.docs[0].post_categories,
            post_content: post.data.docs[0].post_content
        })


    }




    // form material on change event
    handleOnChange = (e) => {


        if (e.target.type === "checkbox") {

            let postCategories

            if (e.target.checked === true) {
                postCategories = this.state.post_categories


                this.state.categories.map((item, index) => {
                    if (e.target.dataset.id == item._id) {
                        postCategories.push(item)

                    }
                })
            } else {
                postCategories = new Array()

                this.state.post_categories.map((item, index) => {
                    if (e.target.dataset.id != item._id) {
                        postCategories.push(item)

                    }
                })

            }


            this.setState({
                post_categories: postCategories
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

        const postContent = editor.getData()

        this.setState({
            post_content: postContent
        })



    }

    handleSubmit = async (e) => {
        e.preventDefault()


        let formData = new FormData()
        if (this.state.post_image) {
            await formData.append('file', this.state.post_image)
            this.state.post_image = this.state.post_image.name
        } else {
            this.state.post_image = "default.jpg"
        }


        await formData.append('data', JSON.stringify(this.state))

        let submitResponse = '';
        if (this.props.post_id) {
            submitResponse = await api.put(process.env.REACT_APP_API_ENDPOINT + '/posts/' + this.props.post_id, formData, { headers: { 'content-type': 'multipart/form-data', 'auth-token': localStorage.getItem('auth-token') } })
        } else {
            submitResponse = await api.post(process.env.REACT_APP_API_ENDPOINT + '/posts', formData, { headers: { 'content-type': 'multipart/form-data', 'auth-token': localStorage.getItem('auth-token') } })
        }

        if (submitResponse.data.response) {
            Swal.fire({
                title: 'Başarılı!',
                text: "Yazı kaydedildi",
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
        /* categories field */
        let categoriesHtml = ""
        if (this.state.is_categories_loaded) {
            categoriesHtml = this.state.categories.map((item, index) => {

                let checked = false
                this.state.post_categories.map((postCategoryItem) => {
                    if (item._id == postCategoryItem._id) {
                        checked = true
                    }
                })

                let className = ''
                if (item.category_upper_category_id != null) {
                    className = "ml-3"
                }

                return (
                    <>
                        <div class={"form-check " + className}>
                            <input class="form-check-input" checked={checked} data-index={index} data-id={item._id} onChange={this.handleOnChange} type="checkbox" value="" id={item._id} />
                            <label class="form-check-label" for={item._id}>
                                {item.category_name}
                            </label>
                        </div>
                    </>
                )

            })
        }

        return (
            <form className="" onSubmit={this.handleSubmit}>
                <div className="position-relative row form-group">
                    <label for="post_title" className="col-sm-4 col-form-label">Yazı Başlığı</label>
                    <div className="col-sm-8">
                        <input name="post_title" id="post_title" value={this.state.post_title} onChange={this.handleOnChange} required placeholder="Yazı başlığı giriniz" type="text" className="form-control" />
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <label for="post_alternative_title" className="col-sm-4 col-form-label">Yazı Alt Başlığı</label>
                    <div className="col-sm-8">
                        <input name="post_alternative_title" id="post_alternative_title" value={this.state.post_alternative_title} onChange={this.handleOnChange} required placeholder="Yazı alt başlığı giriniz" type="text" className="form-control" />
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <label for="post_image" className="col-sm-4 col-form-label">Yazı Görseli</label>
                    <div className="col-sm-8">
                        <input name="post_image" id="post_image" onChange={this.handleOnChange} required placeholder="Yazı görseli" type="file" className="form-control" />
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <label for="post_state" className="col-sm-4 col-form-label">Yazı Durumu</label>
                    <div className="col-sm-8">
                        <select className="form-control" name="post_state" onChange={this.handleOnChange} required value={this.state.post_state}>
                            <option value="" disabled selected>Seçiniz</option>
                            <option value="1">Yayında</option>
                            <option value="0">Taslak</option>
                        </select>
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <label for="is_post_shown_on_slider" className="col-sm-4 col-form-label">Kayan Haberlerde Görünsün Mü</label>
                    <div className="col-sm-8">
                        <select className="form-control" required name="is_post_shown_on_slider" onChange={this.handleOnChange} value={this.state.is_post_shown_on_slider}>
                            <option value="" disabled selected>Seçiniz</option>
                            <option value={true}>Evet</option>
                            <option value={false}>Hayır</option>
                        </select>
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <label for="is_post_open_for_comment" className="col-sm-4 col-form-label">Yazı Yoruma Açık Olsun</label>
                    <div className="col-sm-8">
                        <select className="form-control" required name="is_post_open_for_comment" onChange={this.handleOnChange} value={this.state.is_post_open_for_comment}>
                            <option value="" disabled selected>Seçiniz</option>
                            <option value={true}>Evet</option>
                            <option value={false}>Hayır</option>
                        </select>
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <label for="post_keywords" className="col-sm-4 col-form-label">Yazı Anathar Kelimeleri</label>
                    <div className="col-sm-8">
                        <input name="post_keywords" id="post_keywords" value={this.state.post_keywords} onChange={this.handleOnChange} required placeholder="Yazı anahtar kelimeleri giriniz" type="text" className="form-control" />
                    </div>
                </div>
                <div className="categories">
                    {categoriesHtml}
                </div>
                <CKEditor
                    editor={ClassicEditor}

                    onInit={editor => {
                        editor.setData(this.state.post_content)
                    }}

                    config={
                        {
                            ckfinder: {
                                uploadUrl: process.env.REACT_APP_API_ENDPOINT + '/file/upload'
                            }
                        }

                    }

                    data={this.state.post_content}
                    onChange={this.handleCkEditorOnchange}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />


                <div className="position-relative form-group float-right mt-3">
                    <a href={adminUrls.POST_LIST_VIEW} className="btn btn*default">Geri Dön</a>
                    <button className="btn btn-primary" type="submit"> Kaydet </button>
                </div>


            </form>
        )
    }


}

export default FormPost