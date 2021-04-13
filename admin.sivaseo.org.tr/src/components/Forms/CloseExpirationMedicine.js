import React from 'react'
import { Link } from 'react-router-dom'




class CloseExpirationMedicineForm extends React.Component {

    constructor() {
        super()

        this.state = {
            close_expiration_medicine_name: "",
            close_expiration_medicine_piece: "",
            close_expiration_medicine_mf_piece: "",
            close_expiration_medicine_expiration_date: "",
            close_expiration_medicine_image: '',
            is_submitting: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }



    componentDidMount() {
        console.log(this.props.states);
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
                [e.target.name]: e.target.files[0]
            })
        }else {
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
        console.log(this.state);
        
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
                    <label for="close_expiration_medicine_name" className="col-sm-4 col-form-label">İlaç Adı *</label>
                    <div className="col-sm-8">
                        <input name="close_expiration_medicine_name" id="close_expiration_medicine_name" required value={this.state.close_expiration_medicine_name} onChange={this.handleOnChange} required placeholder="İlaç adı giriniz" type="text" className="form-control" />
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <label for="close_expiration_medicine_piece" className="col-sm-4 col-form-label">İlaç Adedi *</label>
                    <div className="col-sm-8">
                        <input name="close_expiration_medicine_piece" id="close_expiration_medicine_piece" required value={this.state.close_expiration_medicine_piece} onChange={this.handleOnChange} required placeholder="İlaç Adedi giriniz" type="number" className="form-control" />
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <label for="close_expiration_medicine_mf_piece" className="col-sm-4 col-form-label">İlaç Mf Adedi *</label>
                    <div className="col-sm-8">
                        <input name="close_expiration_medicine_mf_piece" id="close_expiration_medicine_mf_piece" required value={this.state.close_expiration_medicine_mf_piece} onChange={this.handleOnChange} required placeholder="İlaç Adedi giriniz" type="number" className="form-control" />
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <label for="close_expiration_medicine_expiration_date" className="col-sm-4 col-form-label">İlaç Miadı *</label>
                    <div className="col-sm-8">
                        <input name="close_expiration_medicine_expiration_date" id="close_expiration_medicine_expiration_date" required required value={this.state.close_expiration_medicine_expiration_date} onChange={this.handleOnChange} required placeholder="İlaç Adedi giriniz" type="date" className="form-control" />
                    </div>
                </div>
               
                <div className="position-relative row form-group">
                    <label for="close_expiration_medicine_image" className="col-sm-4 col-form-label">İlaç Görseli</label>
                    <div className="col-sm-8">
                        <input name="close_expiration_medicine_image" id="close_expiration_medicine_image"  onChange={this.handleOnChange} type="file" className="form-control" />
                    </div>
                </div>

                <div className="position-relative form-group float-right">
                    <Link to="/close-expiration-medicine/list" className="btn btn-default">Geri Dön</Link>
                    <button className="btn btn-primary" onClick={this.btnSaveHandle} type="submit"> {btnSaveInnerText} </button>
                </div>


            </form>
        )
    }

}

export default CloseExpirationMedicineForm