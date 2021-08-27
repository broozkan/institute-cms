import React from 'react'
import twitterLogo from '../../../images/twitter.png'
import facebookLogo from '../../../images/facebook.png'
import whatsappLogo from '../../../images/whatsapp.png'
import instagramLogo from '../../../images/instagram.png'

const SocialMediaLinksSection = () => {



    return (
        <div className="social-media-icons-container-sidebar">
            <ul>
                <li>
                    <div className="row">
                        <div className="col-lg-4 col-12">
                            <a href="https://twitter.com/sivaseczodasi" target="_blank"><img src={twitterLogo} className="img-fluid" /></a>

                        </div>
                        <div className="col-lg-8 col-12 social-media-name pt-2">
                            <a href="https://twitter.com/sivaseczodasi" target="_blank">sivaseo</a>

                        </div>
                    </div>
                </li>
                <li>
                    <div className="row">
                        <div className="col-lg-4 col-12">
                            <a href="https://www.facebook.com/sivaseczaciodasi" target="_blank"><img src={facebookLogo} className="img-fluid" /></a>

                        </div>
                        <div className="col-lg-8 col-12 social-media-name pt-2">
                            <a href="https://www.facebook.com/sivaseczaciodasi" target="_blank">sivaseo</a>

                        </div>
                    </div>
                </li>
                <li>
                    <div className="row">
                        <div className="col-lg-4 col-12">
                            <a href="https://api.whatsapp.com/send?phone=905321673474" target="_blank"><img src={whatsappLogo} className="img-fluid" /></a>

                        </div>
                        <div className="col-lg-8 col-12 social-media-name pt-2">
                            <a href="https://api.whatsapp.com/send?phone=905321673474" target="_blank">sivaseo</a>

                        </div>
                    </div>
                </li>
                <li>
                    <div className="row">
                        <div className="col-lg-4 col-12">
                            <a href="https://www.instagram.com/sivaseczoda/" target="_blank"><img src={instagramLogo} className="img-fluid" /></a>

                        </div>
                        <div className="col-lg-8 col-12 social-media-name pt-2">
                            <a href="https://www.instagram.com/sivaseczoda/" target="_blank">sivaseo</a>

                        </div>
                    </div>
                </li>

            </ul>
        </div>
    )
}

export default SocialMediaLinksSection