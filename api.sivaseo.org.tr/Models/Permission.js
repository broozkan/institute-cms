const mongoose = require('mongoose')


const permissionSchema = mongoose.Schema({
    permission_verbose_name : {
        type : String,
        required : true
    },
    permission_model_name : {
        type : String,
        required : true
    },
    permission_state : {
        type : Boolean,
        required : true
    }
})

module.exports.permissionSchema = permissionSchema
module.exports.permissionModel = mongoose.model('Permission', permissionSchema)
