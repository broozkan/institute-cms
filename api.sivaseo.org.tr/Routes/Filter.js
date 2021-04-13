// delete object for full listing
const deleteObjectForAllListing = async (filters) => {

    // if user select to list all items delete the filter object
    await Object.keys(filters).map((key, index) => {
        if(filters[key] == "*"){
            delete filters[key]
        }
    })
    return filters
}


module.exports = deleteObjectForAllListing

