// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurantData')

//新增頁面
router.get('/new', (req, res) => {
  console.log('新增頁面')
  //測試
  let id
  Restaurant.find({},{id:1 })
  .where('id').equals(2)
  .then(result => console.log(result))
  .then()

  return res.render('new')
})

//新增資料 - 沒有輸入的資料該如何處理
router.post('/new', (req, res) => {
  const { id, name, name_en, category, image, location, phone, google_map, rating, description } = req.body      // 從 req.body 拿出表單裡的 name 資料
  console.log('新增資料路由')
  return Restaurant.create({ id, name, name_en, category, image, location, phone, google_map, rating, description })     // 存入資料庫
  .then(() => res.redirect('/')) // 新增完成後導回首頁
  .catch(error => console.log(error))
})
    
//詳細資料
router.get('/:id', (req, res) => {
  console.log('詳細資料路由')
  const id = req.params.id
  // const id = req.
  console.log('_id: '+ id)
  return Restaurant.findById(id)
  .lean()
  .then((restaurants) => res.render('show', { restaurants }))
  .catch(error => console.log(error))      
})

//編輯頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  console.log('編輯資料頁面')
  console.log('id: '+ id)
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})

//編輯內容
router.put('/:id', (req, res) => {
  const _id = req.params.id
  // const name = req.body.name
  console.log('編輯資料路由')
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body      // 從 req.body 拿出表單裡的 name 資料
  return Restaurant.findById(_id)
    .then((restaurants) => {
      restaurants.name = name
      restaurants.category = category
      restaurants.location = location
      restaurants.phone = phone
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
  console.log('刪除資料路由')
  return Restaurant.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router