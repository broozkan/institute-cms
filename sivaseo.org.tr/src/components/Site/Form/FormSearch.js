import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import api from '../../../services/api'
import { Link } from 'react-router-dom'
import { Component } from 'react'
import { siteUrls } from '../../../lib/Site/siteUrls'
import { SiteContext } from '../../../contexts/Site/SiteContext'

class FormSearch extends Component {

    static contextType = SiteContext

    constructor() {
        super()
        this.state = {
            search: '',
            is_form_submitting: false
        }
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnClick = this.handleOnClick.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }




    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleOnClick() {
        this.context.setSearchVisibility(false)

    }

    handleOnSubmit = async (e) => {
        e.preventDefault()

        this.setState({
            is_form_submitting: true
        })


        window.location.href = `${siteUrls.SEARCH_RESULT_VIEW}/${this.state.search}`
    }


    render() {

        // render visibility
        let visibilityClass = ''
        if (this.context.searchVisibility) {
            visibilityClass = 'open'
        }

        return (
            <>
                <div className={"form-search-container " + visibilityClass}>
                    <button className="btn btn-danger close-search" onClick={this.handleOnClick}><i className="fa fa-times fa-3x"></i></button>
                    <form id="form-search" className="fix mb-60 p-3 form-inline" method="POST" onSubmit={this.handleOnSubmit}>
                        <div className="form-group">
                            <input className="form-control form-control-lg" name="search" onChange={this.handleOnChange} value={this.state.search} placeholder="Merhaba, nasıl yardımcı olabiliriz" required type="text" />
                            <button className="btn btn-danger" type="submit"><i className="fa fa-search"></i></button>
                        </div>
                    </form>
                </div >
            </>
        )
    }

}


export default FormSearch