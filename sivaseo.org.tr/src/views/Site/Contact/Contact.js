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
								<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.573471667844!2d37.013853315375705!3d39.749230929448295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4711ddd7b2573266!2sAr%C4%B1%20sitesi!5e0!3m2!1str!2str!4v1630066175924!5m2!1str!2str" width="100%" height="450" style={{ border: 'none' }} allowfullscreen="" loading="lazy"></iframe>
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

