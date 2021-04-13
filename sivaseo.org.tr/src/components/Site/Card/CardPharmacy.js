import React from 'react'
import pharmacy_logo from '../../../images/logo/eczane_logo.png'
import QrCode from 'qrcode.react'

const PharmacyCard = (props) => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-lg-2">
                        <img src={pharmacy_logo} />
                    </div>
                    <div className="col-lg-8">
                        <h5>{props.pharmacy_informations.sentinelpharmacy_name}</h5>
                        <p>{props.pharmacy_informations.sentinelpharmacy_address}</p>
                        <div class="btn-group">
                            <a href={"https://maps.google.com/?q="+props.pharmacy_informations.sentinelpharmacy_location} target="_blank" className="btn btn-outline-danger "> <span className="fa fa-map-pin"></span> Yol Tarifi Al</a>
                            <a href={"tel:"+props.pharmacy_informations.sentinelpharmacy_phone_number} className="btn btn-outline-danger ml-2"> <span className="fa fa-phone"></span> Ara</a>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <QrCode size="64" value={"https://maps.google.com/?q="+props.pharmacy_informations.sentinelpharmacy_location}></QrCode>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default PharmacyCard