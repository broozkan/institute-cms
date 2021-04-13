import React from 'react'
import ListItem from '../ListItem/ListItemFile'


const ListFile = (props) => {

    

    return(
        <ul id="file-list">
            <ListItem 
                item={{
                    name:"Oda Kayıt Belgesi",
                    file_id:"0"
                }} 
            />
            <ListItem 
                item={{
                    name:"Kayıt Teyit Belgesi",
                    file_id:"1"

                }} 
            />
            <ListItem 
                item={{
                    name:"Sicil Belgesi",
                    file_id:"2"

                }} 
            />
        </ul>
    )
}

export default ListFile