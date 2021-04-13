import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { SiteContextWrapper, SiteContext } from '../../../contexts/Site/SiteContext'

const CardUserPanelQuery = (props) => {

    const contextValue = useContext(SiteContext);


    return (
        <div className="col-md-3 card-user-panel-container">
            <Link to={props.query.query_href}>

                <div className="card card-user-panel">
                    <div className="card-body">
                        <div className="row card-user-panel-query-content">
                            <div className="col-md-12 text-center p-2">
                                <span className={props.query.query_icon_class+" fa-3x"}></span>
                            </div>
                            <div className="col-md-12 text-center p-2">
                                <h6 className="card-user-panel-query-name">{props.query.query_name}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

        </div>


    )
}


export default CardUserPanelQuery
