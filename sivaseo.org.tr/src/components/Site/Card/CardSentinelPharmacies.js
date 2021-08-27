import React, { useContext, useEffect, useState } from 'react'
import { SiteContext } from '../../../contexts/Site/SiteContext'


const CardSentinelPharmacies = (props) => {

    const siteContext = useContext(SiteContext)



    return (
        <div className="card card-sentinel-pharmacy d-none" onClick={props.onClick}>
            <div className="card-body text-center">
                <img src={`${process.env.REACT_APP_API_ENDPOINT}/file/nobetci_eczane_logo.gif`} className="w-75" alt="" />
                <h5 className="d-sm-none">{siteContext.dayName} {siteContext.monthName} NÖBETÇİ <span style={{ fontSize: '10px' }}>ECZANELER</span> </h5>
            </div>
        </div>
    )
}

export default CardSentinelPharmacies
