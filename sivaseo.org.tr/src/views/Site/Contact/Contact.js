import React, { Component } from 'react'
import FormContact from '../../../components/Site/Form/FormContact'
import ContactCard from '../../../components/Site/Card/CardContact'
import PageTitle from '../../../components/Site/PageTitle/PageTitle'
import SocialMediaLinksSection from '../../../components/Site/Section/SocialMediaLinksSection'

class ContactPage extends React.Component {

	constructor() {
		super()
	}





	render() {

		return (
			<>
				<PageTitle title={["İletişim"]} />

				<div className="page-body ptb-70">
					<div className="container">
						<div className="row">
							<div className="col-lg-9 col-md-8">
								<FormContact />
								<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.744827408756!2d28.95272341541543!3d41.052708979296256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab74b6dc62ae3%3A0x166f25af11cc90dc!2zU2l2YXMgRWN6YWPEsSBPZGFzxLE!5e0!3m2!1str!2str!4v1616097384895!5m2!1str!2str" width="100%" height="450" style={{ border: 'none' }} allowfullscreen="" loading="lazy"></iframe>
							</div>
							<div className="col-lg-3 col-md-4">
								<ContactCard />
								<SocialMediaLinksSection />
							</div>

						</div>
					</div>
				</div>
			</>
		)
	}

}

export default ContactPage

