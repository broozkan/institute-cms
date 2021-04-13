import React from 'react'

const SquareShortcutLink = (props) => {
    return (
        <a href={props.shortcut.shortcut_url} target="_blank">
            <button className="btn btn-lg mt-1 btn-default">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <img src={process.env.REACT_APP_API_ENDPOINT + "/file/" + props.shortcut.shortcut_image} alt=""></img>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center px-0">
                        <label>{props.shortcut.shortcut_name}</label>

                    </div>
                </div>
            </button>
        </a>

    )
}

export default SquareShortcutLink