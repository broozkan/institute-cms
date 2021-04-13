import React from 'react'
import { Link } from 'react-router-dom'

import getShortcutList from '../../data/ShortcutData'



class ShortcutForm extends React.Component {

    constructor() {
        super()

        this.state = {
            shortcut_name: "",
            shortcut_model_name: "",
            shortcut_url: "",
            shortcut_image: null,
            is_shortcut_open_in_new_tab: true,
            is_submitting: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

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
        }else if(e.target.type === "file"){
            this.setState({
                shortcut_image: e.target.files[0]
            })
        }else {
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


        return (
            <form className="" onSubmit={this.handleSubmit}>
                <div className="position-relative row form-group">
                    <label for="shortcut_name" className="col-sm-4 col-form-label">Kısayol Adı</label>
                    <div className="col-sm-8">
                        <input name="shortcut_name" id="shortcut_name" value={this.state.shortcut_name} onChange={this.handleOnChange} required placeholder="Kısayol adı giriniz" type="text" className="form-control" />
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <label for="shortcut_model_name" className="col-sm-4 col-form-label">Kısayol Çağırma Adı</label>
                    <div className="col-sm-8">
                        <input name="shortcut_model_name" id="shortcut_model_name" value={this.state.shortcut_model_name} onChange={this.handleOnChange} required placeholder="Kısayolu çağırmak adına bir kısaltma giriniz" type="text" className="form-control" />
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <label for="shortcut_url" className="col-sm-4 col-form-label">Kısayol Url'si</label>
                    <div className="col-sm-8">
                        <input name="shortcut_url" id="shortcut_url" value={this.state.shortcut_url} onChange={this.handleOnChange} required placeholder="Kısayolun yönlendireceği adres" type="text" className="form-control" />
                    </div>
                </div>
                <div className="position-relative form-check">
                    <input name="is_shortcut_open_in_new_tab" id="is_shortcut_open_in_new_tab" type="checkbox" checked={this.state.is_shortcut_open_in_new_tab} onChange={this.handleOnChange} className="form-check-input" />
                    <label for="is_shortcut_open_in_new_tab" className="form-check-label">Yeni Sekmede Açılsın</label>
                </div>

                <div className="position-relative row form-group">
                    <label for="shortcut_image" className="col-sm-4 col-form-label">Kısayol Görseli</label>
                    <div className="col-sm-8">
                        <input name="shortcut_image" id="shortcut_image" onChange={this.handleOnChange} required placeholder="Kısayolun yönlendireceği adres" type="file" className="form-control" />
                    </div>
                </div>

                <div className="position-relative form-group float-right">
                    <Link to="/shortcut/list" className="btn btn*default">Geri Dön</Link>
                    <button className="btn btn-primary" onClick={this.btnSaveHandle} type="submit"> {btnSaveInnerText} </button>
                </div>


            </form>
        )
    }

}

export default ShortcutForm