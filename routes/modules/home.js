// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurantData')
// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  console.log('userid: ',userId)
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
// 匯出路由模組
module.exports = router