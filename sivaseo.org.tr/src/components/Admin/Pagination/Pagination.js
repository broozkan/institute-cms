import React, {useState} from 'react'


const Pagination = (props) => {

    const [state, setState] = useState({
        clicked_index: 1
    })

    const handleClick = (e) => {

        if(!e){
            return false
        }

        setState({
            ...state,
            clicked_index: e.target.dataset.index
        })

        props.onClick(e.target.dataset.index)
       
    }
   
    let paginationHtml = []
    for (let index = 0; index < props.object.totalPages; index++) {
        if(index == 0 && !props.object.hasPrevPage){
            paginationHtml.push(
                <button type="button" disabled class="btn btn-primary">Önceki</button>
            )
        }else if(index == 0){
            paginationHtml.push(
                <button type="button" onClick={handleClick} data-index={props.object.page-1} class="btn btn-primary">Önceki</button>
            )

        }
        
        if(index+1 == state.clicked_index){
            paginationHtml.push(
                <button 
                    type="button" 
                    data-index={index+1}
                    onClick={() => {
                        props.onClick(index+1)
                        handleClick()
                    }} 
                    class="active btn btn-primary"
                >
                    {index+1}
                </button>
            )
        }else{
            paginationHtml.push(
                <button 
                    type="button" 
                    data-index={index+1}
                    onClick={handleClick} 
                    class="btn btn-primary"
                >
                    {index+1}
                </button>
            )
        }
        

        if(index == (props.object.totalPages-1) && !props.object.hasNextPage){
            paginationHtml.push(
                <button type="button"  disabled class="btn btn-primary">Sonraki</button>
            )
        }else if(index == (props.object.totalPages-1)){
            paginationHtml.push(
                <button type="button" onClick={handleClick} data-index={props.object.page+1} class="btn btn-primary">Sonraki</button>
            )
        }
    }
    

    return(
        <div class="btn-group table-pagination-button-group">
            {paginationHtml}
        </div>
    )
}

export default Pagination