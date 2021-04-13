const CloseExpirationModel = require('../Models/ModelCloseExpiration')


class CloseExpiration {
    constructor(
        close_expiration_name,
        close_expiration_piece,
        close_expiration_mf_piece,
        close_expiration_stock_piece,
        close_expiration_price,
        close_expiration_expiration_date,
        close_expiration_image,
        close_expiration_user
    ) {
        this.close_expiration_id = ''
        this.close_expiration_name = close_expiration_name
        this.close_expiration_piece = close_expiration_piece
        this.close_expiration_mf_piece = close_expiration_mf_piece
        this.close_expiration_stock_piece = close_expiration_stock_piece
        this.close_expiration_price = close_expiration_price
        this.close_expiration_expiration_date = close_expiration_expiration_date
        this.close_expiration_image = close_expiration_image
        this.close_expiration_user = close_expiration_user

    }

    setCloseExpirationId(close_expiration_id) {
        this.close_expiration_id = close_expiration_id
    }


    async save(cb) {
        const savedCloseExpiration = new CloseExpirationModel.closeExpirationModel(this)

        await savedCloseExpiration.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message,
                    status: 400
                })
            } else {
                cb({
                    response: true,
                    responseData: savedCloseExpiration,
                    status: 400
                })
            }
        })
    }


    async update(cb) {

        if (this.close_expiration_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await CloseExpirationModel.closeExpirationModel.findByIdAndUpdate(
            { _id: this.close_expiration_id },
            this

            , (err, updatedCloseExpiration) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedCloseExpiration
                    })
                }
            })
    }


    async delete(cb) {
        await CloseExpirationModel.closeExpirationModel.deleteOne({ _id: this.close_expiration_id }, (err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err
                })
            } else {
                cb({
                    response: true,
                    responseData: "Başarılı"
                })
            }
        })
    }
}

module.exports = CloseExpiration