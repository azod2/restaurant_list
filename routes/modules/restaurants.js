// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurantData')

//新增頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

//新增資料
router.post('/new', (req, res) => {
  const { id, name, name_en, category, image, location, phone, google_map, rating, description } = req.body      // 從 req.body 拿出表單裡的 name 資料
  const userId = req.user._id
  return Restaurant.create({ id, name, name_en, category, image, location, phone, google_map, rating, description, userId })     // 存入資料庫
  .then(() => res.redirect('/')) // 新增完成後導回首頁
  .catch(error => console.log(error))
})
    
//詳細資料
router.get('/:id', (req, res) => {
  // console.log('詳細資料路由')
  const id = req.params.id
  // console.log('_id: '+ id)
  return Restaurant.findById(id)
  .lean()
  .then((restaurants) => res.render('show', { restaurants }))
  .catch(error => console.log(error))      
})

//編輯頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
    console.log('取得編輯路由')
  return Restaurant.findById(id)
    .lean()
      // .then((restaurants) => console.log(restaurants))
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})

//編輯內容
router.put('/:id', (req, res) => {
  const restaurant_id = req.params.id

  console.log('編輯資料路由')
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body      // 從 req.body 拿出表單裡的 name 資料
  return Restaurant.findById(restaurant_id)
    .then((restaurants) => {
      restaurants.name = name
      restaurants.name_en = name_en
      restaurants.category = category
      restaurants.location = location
      restaurants.phone = phone
      restaurants.google_map = google_map
      restaurants.description = description
      restaurants.rating = rating
      restaurants.image = image
      return restaurants.save()
    })
    .then(()=> res.redirect(`/`))
    .catch(error => console.log(error))
})

//刪除內容
router.delete('/:id', (req, res) => {
  const id = req.params.id
  // console.log('刪除資料路由')
  return Restaurant.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router