import React from 'react'
import { Link } from 'react-router-dom'

import getFormList from '../../data/FormData'



class FormForm extends React.Component {

    constructor() {
        super()

        this.state = {
            form_name: "",
            form_content: [],
            is_submitting: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAddFormContent = this.handleAddFormContent.bind(this)
        this.handleFormContentChange = this.handleFormContentChange.bind(this)
    }



    componentDidMount() {

        this.setState(this.props.states)        

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
    }
    // form materials on change event end

    async handleSubmit(e) {
        e.preventDefault()
        this.setState({
            is_submitting: true
        })
        console.log(this.state);
        await this.props.formSubmitFunction(this.state)
        this.setState({
            is_submitting: false
        })
    }



    /* add form content object to this.state.form_content */
    handleAddFormContent(){
        let formContentArray = this.state.form_content

        formContentArray.push({
            form_content_element_label: "",
            form_content_element_type_name: "",
            is_form_content_required: true,
            form_content_additional_classes: ""
        })

        this.setState({
            form_content: formContentArray
        })
    }
    /* add form content object to this.state.form_content */

    /* form content elements change handle */
    handleFormContentChange(e){
        let formContentArray = []

        this.state.form_content.map((item, index) => {
            if(e.target.dataset.index == index){
                
                if(e.target.name == "form_content_list_element_options"){
                    item.form_content_list_element_options = e.target.value.split(",")
                }else{
                    item[e.target.name] = e.target.value
                }

                formContentArray.push(item)
            }else{
                formContentArray.push(item)
            }
        })
     
        this.setState({
            form_content: formContentArray
        })
    }
    /* form content elements change handle */


    render() {

        // loader queries for submit button
        let btnSaveInnerText = "Kaydet";
        if (this.state.is_submitting == true) {
            btnSaveInnerText = <span className="fa fa-spinner fa-spin"></span>
        }

        

        // form contents 
        let formContents = ""

        if (this.state.form_content) {
            

            formContents = this.state.form_content.map((item, index) => {

                let listTypeOptions = ""

                // if user selects "select" type open select option list field
                if(item.form_content_element_type_name === "select"){
                    listTypeOptions = 
                    <div className="col-sm-6">
                        <input className="form-control" data-index={index} onChange={this.handleFormContentChange} value={item.form_content_list_element_options} name="form_content_list_element_options" placeholder="Liste seçeneklerini aralarına virgül koyarak giriniz" />
                    </div>
                }

                return (
                    <div className="form-content-group">
                        <div className="position-relative row form-group">
                            <label for="form_name" className="col-sm-2 col-form-label">Etiket</label>
                            <div className="col-sm-4">
                                <input className="form-control" name="form_content_element_label" data-index={index} onChange={this.handleFormContentChange} value={item.form_content_element_label} placeholder="Etiket giriniz. Örn: Adınız Soyadınız" />
                            </div>
                        </div>
                        <div className="position-relative row form-group">
                            <label for="form_name" className="col-sm-2 col-form-label">Tip</label>
                            <div className="col-sm-4">
                                <select className="form-control" name="form_content_element_type_name" data-index={index} onChange={this.handleFormContentChange} value={item.form_content_element_type_name}>
                                    <option value="" disabled selected>Seçiniz</option>
                                    <option value="select">Liste Seçimi</option>
                                    <option value="checkbox">Tick Seçimi</option>
                                    <option value="input[type=text]">Yazı Alanı</option>
                                    <option value="input[type=number]">Sayı Alanı</option>
                                    <option value="input[type=date]">Tarih Alanı</option>
                                    <option value="input[type=password]">Parola Alanı</option>
                                </select>
                            </div>
                            {listTypeOptions}
                            
                        </div>
                        <div className="position-relative row form-group">
                            <label for="form_name" className="col-sm-2 col-form-label">Zorunlu</label>
                            <div className="col-sm-4">
                                <input name="form_content_is_element_required" type="checkbox" checked={item.form_content_is_element_required} onChange={this.handleFormContentChange} className="ml-1 form-check-input" />
                            </div>
                        </div>
                        <hr></hr>
                    </div>


                )
            })
        }
        

        return (
            <form className="" onSubmit={this.handleSubmit}>
                <div className="position-relative row form-group">
                    <label for="form_name" className="col-sm-4 col-form-label">Form Adı</label>
                    <div className="col-sm-8">
                        <input name="form_name" id="form_name" value={this.state.form_name} onChange={this.handleOnChange} required placeholder="Form adı giriniz" type="text" className="form-control" />
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <button className="btn btn-success" type="button" onClick={this.handleAddFormContent}><span className="fa fa-plus"></span> Form içeriği Ekle</button>
                </div>
                {formContents}

                <div className="position-relative form-group float-right">
                    <Link to="/form/list" className="btn btn*default">Geri Dön</Link>
                    <button className="btn btn-primary" onClick={this.btnSaveHandle} type="submit"> {btnSaveInnerText} </button>
                </div>


            </form>
        )
    }

}

export default FormForm