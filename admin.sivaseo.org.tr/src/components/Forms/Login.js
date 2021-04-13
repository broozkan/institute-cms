import React from 'react'
import { Link } from 'react-router-dom'




class Login extends React.Component {

    constructor() {
        super()

        this.state = {
            user_username: "",
            user_password: "",
            remember_me: false,
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
        let btnSaveInnerText = "Giriş Yap";
        if (this.state.is_submitting == true) {
            btnSaveInnerText = <span className="fa fa-spinner fa-spin"></span>
        }


        return (
            <form className="" onSubmit={this.handleSubmit}>
                <div className="position-relative row form-group">
                    <label for="user_username" className="col-sm-4 col-form-label">Kullanıcı Adı</label>
                    <div className="col-sm-8">
                        <input name="user_username" id="user_username" value={this.state.user_username} onChange={this.handleOnChange} required placeholder="Kullanıcı Adınız" type="text" className="form-control" />
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <label for="user_password" className="col-sm-4 col-form-label">Parola</label>
                    <div className="col-sm-8">
                        <input name="user_password" id="user_password" value={this.state.user_password} onChange={this.handleOnChange} required placeholder="Parolanız" type="password" className="form-control" />
                    </div>
                </div>

                <div className="position-relative form-check">
                    <input name="remember_me" id="remember_me" type="checkbox" checked={this.state.remember_me} onChange={this.handleOnChange} className="form-check-input" />
                    <label for="remember_me" className="form-check-label">Beni Hatırla</label>
                </div>
                <div className="position-relative form-group float-right">
                    <button className="btn btn-primary" onClick={this.btnSaveHandle} type="submit"> {btnSaveInnerText} </button>
                </div>


            </form>
        )
    }

}

export default Login