import React from 'react'
import ListItem from '../ListItem/ListItemFile'


const ListFile = (props) => {



    return (
        <ul id="file-list">
            <ListItem
                item={{
                    name: "Oda Kayıt Belgesi",
                    file_id: "0"
                }}
            />
        </ul>
    )
}

export default ListFile