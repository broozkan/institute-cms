import React, { Component, useContext, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import PharmacyCard from '../Card/CardPharmacy'
import CardSentinelPharmacies from '../Card/CardSentinelPharmacies'
import axios from 'axios'
import CommonSpinner from '../Spinner/CommonSpinner'
import { SiteContext } from '../../../contexts/Site/SiteContext'
import { useEffect } from 'react'
import haversine from 'haversine';



const ModalSentinelPharmacies = () => {

    const [show, setShow] = useState(false)
    const [sentinelPharmacies, setSentinelPharmacies] = useState([])
    const [currentLocation, setCurrentLocation] = useState({})

    const siteContext = useContext(SiteContext)


    useEffect(() => {
        console.log(navigator.geolocation.getCurrentPosition((pos) => {
            setCurrentLocation({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            })
        }));
    }, [])


    const handleShow = () => {
        axios.get(process.env.REACT_APP_API_ENDPOINT + '/sentinelpharmacies/1')
            .then((res) => {
                setShow(true)
                setSentinelPharmacies(res.data.docs)
            })
    }



    const handleClose = () => {
        setShow(false)
    }



    // render sentinel pharmacies
    let sentinelPharmaciesHtml = ""
    if (sentinelPharmacies.length < 1) {
        sentinelPharmaciesHtml = <CommonSpinner />
    } else {

        sentinelPharmaciesHtml = sentinelPharmacies.map((item) => {

            const start = currentLocation
            const sentinelPharmacyLocation = item.sentinel_pharmacy_location.split(',')
            const end = {
                latitude: sentinelPharmacyLocation[0],
                longitude: sentinelPharmacyLocation[1]
            }

            const distance = haversine(start, end, { unit: 'km' })
            item.distance = distance

            return (
                <div className="col-lg-12 ">
                    <PharmacyCard pharmacy_informations={item} />
                </div>
            )
        })
    }

    const date = new Date();

    let dateString = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    return (
        <>
            <CardSentinelPharmacies onClick={handleShow} />
            <Modal animation={false} size="lg" show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>{siteContext.dayName} {siteContext.monthName} Nöbetçi Eczaneler</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row pb-3">
                        <div className="col-lg-12">
                            <form action="http://sivaseo.org.tr/nobetdemo/nobetyarinyeni.php" method="POST" target="_blank">
                                <input name="task" type="date" className="d-none" value={dateString} />
                                <button className="btn btn-lg btn-danger print-sentinel-pharmacies w-100"><span className="fa fa-print"></span> Yazdır</button>
                            </form>
                        </div>
                    </div>
                    <div className="row" id="print-content">
                        {sentinelPharmaciesHtml}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >
                        Kapat
                        </Button>
                </Modal.Footer>
            </Modal>


        </>


    )

}

export default ModalSentinelPharmacies