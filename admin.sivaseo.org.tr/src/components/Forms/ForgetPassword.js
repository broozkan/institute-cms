import React from 'react'
import { Link } from 'react-router-dom'




class ForgetPassword extends React.Component {

    constructor() {
        super()

        this.state = {
            user_email: "",
            is_submitting: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        await this.props.formSubmitFunction(this.state)
        this.setState({
            is_submitting: false
        })
    }


    render() {

        // loader queries for submit button
        let btnSaveInnerText = "Parola Sıfırlama Bağlantısı Gönder";
        
        if (this.state.is_submitting == true) {
            btnSaveInnerText = <span className="fa fa-spinner fa-spin"></span>
        }


        return (
            <form className="" onSubmit={this.handleSubmit}>
                <div className="position-relative row form-group">
                    <label for="user_email" className="col-sm-4 col-form-label">E-Posta Adresiniz</label>
                    <div className="col-sm-8">
                        <input name="user_email" id="user_email" value={this.state.user_email} onChange={this.handleOnChange} required placeholder="E-posta adresiniz" type="text" className="form-control" />
                    </div>
                </div>
                <div className="position-relative form-group float-right">
                    <button className="btn btn-primary" onClick={this.btnSaveHandle} type="submit"> {btnSaveInnerText} </button>
                </div>


            </form>
        )
    }

}

export default ForgetPassword