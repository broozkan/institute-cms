const Joi = require('joi')


// permission validation
const permissionValidation = Joi.object({
    permission_verbose_name : Joi.string().required(),
    permission_model_name : Joi.string().required(),
    permission_state : Joi.bool()
})


// pharmacy validation
const pharmacyValidation = Joi.object({
    pharmacy_name : Joi.string().required(),
    pharmacy_address : Joi.string().required(),
    pharmacy_province : Joi.string().required(),
    pharmacy_district : Joi.string().required(),
    pharmacy_phone_number : Joi.string().required()
})

// category validation
const categoryValidation = Joi.object({
    category_name : Joi.string().required(),
    is_category_main : Joi.bool().required(),
    is_category_checked : Joi.boolean(),

}).unknown(true)


// post validation
const postValidation = Joi.object({
    post_title: Joi.string().required(),
    post_alternative_title: Joi.string(),
    post_image: Joi.string().required(),
    post_content: Joi.string().required(),
    is_post_shown_on_slider: Joi.boolean().required(),
    is_post_open_for_comment: Joi.boolean().required(),
    post_keywords: Joi.string(),
    post_categories: Joi.array().required(),
    post_state: Joi.string().required()
}).unknown(true)



// post state validation
const postStateValidation = Joi.object({
    post_state_name: Joi.string().required(),
    post_state_visibility: Joi.boolean().required()
}).unknown(true)

// shortcut validation
const shortcutValidation = Joi.object({
    shortcut_name: Joi.string().required(),
    shortcut_model_name: Joi.string().required(),
    shortcut_url: Joi.string().required(),
    shortcut_image: Joi.any(),
    is_shortcut_open_in_new_tab: Joi.boolean().required()
}).unknown(true)

// slider validation
const sliderValidation = Joi.object({
    slider_name: Joi.string().required()
}).unknown(true)



// comment validation
const commentValidation = Joi.object({
    comment_post_id: Joi.string().required(),
    comment_sender_name: Joi.string().required(),
    comment_sender_email: Joi.string().email().required(),
    comment: Joi.string().required()
}).unknown(true)


// feedback validation
const feedbackValidation = Joi.object({
    feedback_sender_name: Joi.string().required(),
    feedback_sender_email: Joi.string().email().required(),
    feedback_sender_ip_address: Joi.string().required(),
    feedback_sender_form_id: Joi.string().required(),
    feedback: Joi.string().required()
}).unknown(true)


// form validation
const formValidation = Joi.object({
    form_name: Joi.string().required(),
    form_content: Joi.any().required()
}).unknown(true)



// form content validation
const formContentValidation = Joi.object({
    form_content_element_label: Joi.string().required(),
    form_content_element_type_name: Joi.string().required(),
    is_form_content_required: Joi.bool().required(),
    form_content_additional_classes: Joi.string().allow(''),
    form_content_list_element_options: Joi.array()
}).unknown(true)


// education video playlist validation
const educationVideoPlaylistValidation = Joi.object({
    education_video_playlist_name: Joi.string().required(),
    education_video_playlist_url: Joi.string().required(),
    is_education_video_playlist_private: Joi.bool().required()
}).unknown(true)


// close expiration medicine validation
const closeExpirationMedicineValidation = Joi.object({
    close_expiration_medicine_name: Joi.string(),
    close_expiration_medicine_piece: Joi.number().required(),
    close_expiration_medicine_mf_piece: Joi.number().required(),
    close_expiration_medicine_stock_piece: Joi.number().required(),
    close_expiration_medicine_price: Joi.number().required(),
    close_expiration_medicine_expiration_date: Joi.date().required()
}).unknown(true)


module.exports.closeExpirationMedicineValidation = closeExpirationMedicineValidation
module.exports.educationVideoPlaylistValidation = educationVideoPlaylistValidation
module.exports.formContentValidation = formContentValidation
module.exports.formValidation = formValidation
module.exports.feedbackValidation = feedbackValidation
module.exports.commentValidation = commentValidation
module.exports.sliderValidation = sliderValidation
module.exports.shortcutValidation = shortcutValidation
module.exports.postValidation = postValidation
module.exports.postStateValidation = postStateValidation
module.exports.permissionValidation = permissionValidation
module.exports.pharmacyValidation = pharmacyValidation
module.exports.categoryValidation = categoryValidation


