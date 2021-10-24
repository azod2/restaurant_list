const mongoose = require('mongoose')
const Schema = mongoose.Schema
//建立儲存格式
const restaurantData = new Schema({
    name: {
        type: String, //資料型別是字串
        required: true //必填欄位
    },
    name_en: {
        type: String, //資料型別是字串
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    },
    location: {
        type: String,
    },
    phone: {
        type: String,
    },
    google_map: {
        type: String,
    },
    rating: {
        type: Number,
    },
    description: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userData',
        index: true,
        required: true
    }
})
//讓restaurantData可以被引用
module.exports = mongoose.model('restaurantData', restaurantData)