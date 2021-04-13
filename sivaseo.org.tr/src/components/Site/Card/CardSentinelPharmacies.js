import React, { useContext, useEffect, useState } from 'react'
import { SiteContext } from '../../../contexts/Site/SiteContext'


const CardSentinelPharmacies = (props) => {

    const siteContext = useContext(SiteContext)
    


    return (
        <div className="card card-sentinel-pharmacy d-none" onClick={props.onClick}>
            <div className="card-body text-center">
                <img src="https://2.bp.blogspot.com/-AAtRO7L0Dbk/VjEDPegTKrI/AAAAAAAAcZk/EitgzI6dGRc/s1600/eczane_e_logo_tabela.gif" className="w-75" alt="" />
                <h5 className="d-sm-none">{siteContext.dayName} {siteContext.monthName} Nöbetçi Eczaneler</h5>
            </div>
        </div>
    )
}

export default CardSentinelPharmacies
