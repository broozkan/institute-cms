import React from 'react'
import { Component } from 'react';
import queryString  from 'query-string'
import PageTitle from '../../../components/Site/PageTitle/PageTitle';

class RedirectView extends Component{

    componentDidMount(){
        const urlParams = queryString.parse(this.props.location.search);
        console.log(urlParams);     
        window.location.href = urlParams.link
    }


    render(){
        return(
            <>
			<PageTitle  title={["Yönlendiriliyorsunuz..."]} />
                
            </>
        )
    }
}

export default RedirectView