import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom'
import getCategoryList from '../../data/CategoryData'
import getPostStateList from '../../data/PostStateData'




class PostForm extends React.Component {

    constructor() {
        super()

        this.state = {
            post_title: "",
            post_alternative_title: "",
            post_image: "",
            post_content: "",
            is_post_shown_on_slider: false,
            is_post_open_for_comment: true,
            post_keywords: "",
            post_categories_schema: [],
            is_submitting: false,
            categories: [],
            post_state: "",
            is_categories_loaded: false
        }

        this.handleCkEditorOnchange = this.handleCkEditorOnchange.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount() {

        // get category list
        getCategoryList("", (data) => {

            this.setState({
                categories: data,
                is_categories_loaded: true
            })
        })

        // get states list
        getPostStateList("", (data) => {

            this.setState({
                states: data
            })
        })

        this.setState(this.props.states)
    }


    // get ckeditor data and set state
    handleCkEditorOnchange(e, editor) {
        const postContent = editor.getData()
        this.setState({
            post_content: postContent
        })
    }
    // get ckeditor data and set state


    // form material on change event
    handleOnChange(e) {
        if (e.target.type === "checkbox") {
            let postCategories = this.state.post_categories_schema

            postCategories = this.state.categories.map((item, index) => {
                if (index == e.target.dataset.index) {
                    item.is_category_checked = e.target.checked
                } else {
                    if(this.state.post_categories_schema[index]){
                        item.is_category_checked = this.state.post_categories_schema[index]["is_category_checked"]
                    }
                }
                return item
            })

            let postCategoriesLast = []
            postCategories.map((item) => {
                if(item.is_category_checked){
                    postCategoriesLast.push(item)
                }
            })

            console.log(postCategoriesLast);
            this.setState({
                post_categories_schema: postCategories,
                post_categories:postCategoriesLast,
                [e.target.name]: e.target.checked
            })
            // console.log(postCategories);
        }else if(e.target.type == "file"){
            this.setState({
                [e.target.name]: e.target.files[0]
            })
        }else {
            console.log(e.target.value);
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }
    // form materials on change event end

    async handleSubmit(e) {
        e.preventDefault()
        const postSchemaLast = this.state.post_categories_schema_last
        this.setState({
            is_submitting: true
        })


        await this.props.formSubmitFunction(this.state)
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

        /* categories field */
        let categories = ""

        let cboxCategories = ""
        if (!this.state.is_categories_loaded) {
            cboxCategories = <span className="fa fa-spin fa-spinner"></span>
        } else {
            cboxCategories = this.state.categories.map((item, index) => {
                let isCategoryChecked = false
                if (this.state.post_categories_schema.length < 1) {
                    isCategoryChecked = false
                } else {
                    isCategoryChecked = this.state.post_categories_schema[index]["is_category_checked"]
                }

                if (item.category_upper_category_id) {
                    return (
                        <div className="position-relative form-check my-3 ml-3">
                            <input name={item.category_name} id={item.category_name} data-index={index} type="checkbox" checked={isCategoryChecked} onChange={this.handleOnChange} className="form-check-input" />
                            <label for={item.category_name} className="form-check-label">{item.category_name}</label>
                        </div>
                    )
                } else {
                    return (
                        <div className="position-relative form-check my-3">
                            <input name={item.category_name} id={item.category_name} data-index={index} type="checkbox" checked={isCategoryChecked} onChange={this.handleOnChange} className="form-check-input" />
                            <label for={item.category_name} className="form-check-label">{item.category_name}</label>
                        </div>
                    )
                }





            })
        }
        categories =

            <div className="position-relative row form-group">
                <label for="post_category_id" className="col-sm-4 col-form-label">Yazı Kategorileri</label>
                <div className="col-sm-8">
                    <div className="post-categories">
                        {cboxCategories}

                    </div>

                </div>
            </div>
        /* categories field */

        

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
                <div className="position-relative form-check my-3">
                    <input name="is_post_shown_on_slider" id="is_post_shown_on_slider" type="checkbox" checked={this.state.is_post_shown_on_slider} onChange={this.handleOnChange} className="form-check-input" />
                    <label for="is_post_shown_on_slider" className="form-check-label">Kayan Haberlerde Görünsün</label>
                </div>
                <div className="position-relative form-check my-3">
                    <input name="is_post_open_for_comment" id="is_post_open_for_comment" type="checkbox" checked={this.state.is_post_open_for_comment} onChange={this.handleOnChange} className="form-check-input" />
                    <label for="is_post_open_for_comment" className="form-check-label">Yazı Yoruma Açık Olsun</label>
                </div>
                <div className="position-relative row form-group">
                    <label for="post_keywords" className="col-sm-4 col-form-label">Yazı Anathar Kelimeleri</label>
                    <div className="col-sm-8">
                        <input name="post_keywords" id="post_keywords" value={this.state.post_keywords} onChange={this.handleOnChange} required placeholder="Yazı anahtar kelimeleri giriniz" type="text" className="form-control" />
                    </div>
                </div>
                {categories}

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


                    onChange={this.handleCkEditorOnchange}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />


                <div className="position-relative form-group float-right mt-3">
                    <Link to="/post/list" className="btn btn*default">Geri Dön</Link>
                    <button className="btn btn-primary" type="submit"> {btnSaveInnerText} </button>
                </div>


            </form>
        )
    }

}

export default PostForm