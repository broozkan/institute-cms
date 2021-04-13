import React from 'react'
import { Link } from 'react-router-dom'

import getPostList from '../../data/PostData'



class SliderForm extends React.Component {

    constructor() {
        super()

        this.state = {
            slider_name: "",
            is_sliders_loaded: false
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
        let btnSaveInnerText = "Kaydet";
        if (this.state.is_submitting == true) {
            btnSaveInnerText = <span className="fa fa-spinner fa-spin"></span>
        }



      
        

        return (
            <form className="" onSubmit={this.handleSubmit}>
                <div className="position-relative row form-group">
                    <label for="slider_name" className="col-sm-4 col-form-label">Slider Adı</label>
                    <div className="col-sm-8">
                        <input name="slider_name" id="slider_name" value={this.state.slider_name} onChange={this.handleOnChange} required placeholder="Slider adı giriniz" type="text" className="form-control" />
                    </div>
                </div>

              

                <div className="position-relative form-group float-right">
                    <Link to="/slider/list" className="btn btn*default">Geri Dön</Link>
                    <button className="btn btn-primary" onClick={this.btnSaveHandle} type="submit"> {btnSaveInnerText} </button>
                </div>


            </form>
        )
    }

}

export default SliderForm