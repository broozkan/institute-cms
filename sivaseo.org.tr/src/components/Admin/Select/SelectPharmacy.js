import React, { Component } from 'react';
import api from '../../../services/api';



class SelectPharmacy extends Component {

    constructor() {
        super()
        this.state = {
            pharmacies: [],
            is_pharmacies_loaded: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
    }


    async componentDidMount() {
        const pharmacies = await api.get('/pharmacies/1', { headers: { 'auth-token': localStorage.getItem('auth-token') } })

        this.setState({
            pharmacies: pharmacies.data.docs,
            is_pharmacies_loaded: true
        })

    }


    handleOnChange(e) {
        console.log(e.target.value);
        this.state.pharmacies.map(async (item) => {
            if (item._id == e.target.value) {
                console.log(item);
                e.target.lastvalue = item
            }
        })

        this.props.onChange(e)
    }

    render() {

        let pharmaciesJsx = ''
        if (this.state.is_pharmacies_loaded) {
            pharmaciesJsx = this.state.pharmacies.map((item) => {
                return (
                    <option value={item._id}>{item.pharmacy_name}</option>
                )
            })
        }

        return (
            <select className="form-control" required name="select_pharmacy" onChange={this.handleOnChange} value={this.props.value}>
                <option value="" disabled selected>Eczane seçiniz</option>
                {pharmaciesJsx}
            </select>
        )
    }
}

export default SelectPharmacy