// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//新增頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

//新增資料
router.post('/new', (req, res) => {
  const userId = req.user._id
  return Restaurant.create({ ...req.body, userId })     // 存入資料庫
  .then(() => res.redirect('/')) // 新增完成後導回首頁
  .catch(error => console.log(error))
})
    
//詳細資料
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then((restaurants) => res.render('show', { restaurants }))
  .catch(error => console.log(error))      
})

//編輯頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})

//編輯內容
router.put('/:id', (req, res) => {
  const restaurant_id = req.params.id

  console.log('編輯資料路由')
  return Restaurant.findById(restaurant_id)
    .then((restaurants) => {
      Object.assign(restaurants,req.body)
      return restaurants.save()
    })
    .then(()=> res.redirect(`/`))
    .catch(error => console.log(error))
})

//刪除內容
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router