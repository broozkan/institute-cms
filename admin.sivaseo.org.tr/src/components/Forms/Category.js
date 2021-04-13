import React from 'react'
import { Link } from 'react-router-dom'

import getCategoryList from '../../data/CategoryData'
import getPostList from '../../data/PostData'



class CategoryForm extends React.Component {

    constructor() {
        super()

        this.state = {
            category_name: "",
            is_category_main: true,
            category_type: "",
            categories: [],
            posts: [],
            is_posts_loaded: false,
            is_categories_loaded: false,
            is_submitting: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getPosts = this.getPosts.bind(this)
    }



    componentDidMount() {

        // get category list
        getCategoryList("", (data) => {
            
            this.setState({
                categories: data,
                is_categories_loaded: true
            })
        })


        this.setState(this.props.states)        

    }

    // get posts
    getPosts(){
        getPostList("", {},(data) => {
            
            this.setState({
                posts: data,
                is_posts_loaded: true
            })
        })
    }

    // form material on change event
    handleOnChange(e) {
        if (e.target.type === "checkbox") {
            this.setState({
                [e.target.name]: e.target.checked,
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        console.log(this.state);
    }
    // form materials on change event end

    async handleSubmit(e) {
        e.preventDefault()
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
        if(this.state.category_type == "to_post"){
            if(this.state.posts.length < 1){
                this.getPosts()
            }

            let optionPosts = ""
            if(!this.state.is_posts_loaded){
                optionPosts = <option value="" disabled>Yükleniyor...</option>
            }else{
                optionPosts = this.state.posts.map((item) => {
                    return( <option value={item._id}>{item.post_title}</option> )
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
        }else if(this.state.category_type == "external_link"){
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
                    <div class="position-relative form-check disabled">
                        <label class="form-check-label">
                            <input name="category_type" onChange={this.handleOnChange} value="category_list" checked={this.state.category_type === "category_list"} type="radio" class="form-check-input" /> 
                            Kategori İçerik Listesi
                        </label>
                    </div>
                </fieldset>

                <div className="position-relative row form-group">
                    {additionalFieldsHtml}
                </div>

                <div className="position-relative form-group float-right">
                    <Link to="/category/list" className="btn btn*default">Geri Dön</Link>
                    <button className="btn btn-primary" onClick={this.btnSaveHandle} type="submit"> {btnSaveInnerText} </button>
                </div>


            </form>
        )
    }

}

export default CategoryForm