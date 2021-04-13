import React from 'react'
import { Link } from 'react-router-dom'
import { siteUrls } from '../../../lib/Site/siteUrls'

const LinkReturnDashboard = () => {

    return (
        <Link className="btn btn-outline-danger btn-lg mt-4" to={siteUrls.USER_DASHBOARD_VIEW}> <span className="fa fa-arrow-left"></span> Geri</Link>
    )

}

export default LinkReturnDashboard