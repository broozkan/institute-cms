import React from 'react'

const headerSearchForm = () => {
    return(
        <form className="form-inline">
            <input className="form-control form-control-sm mr-sm-2" type="search" placeholder="Sitede arayın" aria-label="Search" />
            <button className="btn btn-outline-danger active btn-sm my-2 my-sm-0" type="submit"><span className="fa fa-search"></span></button>
        </form>
    )
}

export default headerSearchForm