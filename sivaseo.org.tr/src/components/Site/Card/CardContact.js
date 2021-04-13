import React from 'react'

const ContactCard = () => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="section-title mb-20">
                    <h2 className="mb-20">İletişim Bilgileri</h2>
                    <p>37. Bölge Sivas Eczacılar Odası</p>
                </div>
                <ul className="footer-contact-us">
                    <li>
                        <i className="fa fa-phone"></i>
                        <span> <a href="tel:03462236506">+90 (346) 223 65 06</a></span>
                    </li>
                    <li>
                        <i className="fa fa-envelope"></i>
                        <span> <a href="mailto:iletisim@sivaseo.org.tr">iletisim@sivaseo.org.tr</a></span>
                    </li>
                    <li>
                        <i className="fa fa-map-marker"></i>
                        <span>  Arı Sitesi A Blok Kat:1 Sivas /Merkez</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ContactCard