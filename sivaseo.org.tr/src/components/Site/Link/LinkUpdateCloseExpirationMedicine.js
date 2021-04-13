import React from 'react'
import {Link} from 'react-router-dom'

const LinkUpdateCloseExpirationMedicine = (props) => {

    return(
        <Link to={"/user/close-expiration-medicine/update/"+props.close_expiration._id} className="float-right"> <span className="fa fa-edit"></span> Düzenle</Link>
    )

}

export default LinkUpdateCloseExpirationMedicine