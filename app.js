// require packages used in the project
const express = require('express')
const bodyParser = require('body-parser')

// 載入 method-override
const methodOverride = require('method-override') 
const Restaurant = require('./models/restaurantData') //載入 restaurant model
const routes = require('./routes')

const app = express()
const port = 3000

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

//資料庫連線
require('./config/mongoose')

//載入express-handlebars
const exphbs = require('express-handlebars')
//使用layout既定格式
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
//CSS的存放位置
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

// 首頁
/*
app.get('/', (req, res) => {
  Restaurant.find()
            .lean()
            .sort({ _id: 'asc' }) // desc
            .then(restaurants => res.render('index', { restaurants }))
            // .then(restaurants => console.log(restaurants))
            .catch(error => console.log(error))

  // let test = Restaurant.find()
  // .lean()
  // .then(restaurants => res.render('index', { restaurants }))
  // // .then(restaurants => res.render(`${restaurants}`))
  // .catch(error => console.log(error))
 
  // console.log(test)
})*/

//詳細
app.get('/restaurants/:restaurant_id', (req, res) => {
    const id = req.params.restaurant_id

    return Restaurant.find({'id' : id})
      .lean()
      .then((restaurants) => res.render('show', { restaurants : restaurants[0] }))
      .catch(error => console.log(error))      
})


//取得編輯頁面
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.find({'id' : id})
    .lean()
    .then((restaurants) => res.render('edit', { restaurants : restaurants[0] }))
    .catch(error => console.log(error))      
})


//取得編輯頁面
app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  const {name, name_en, category, image, location, phone, google_map, rating, description } = req.body //解構賦值
  return Restaurant.find({'id' : id})
    .then(restaurants => {
      // restaurants.id = parseInt(id) 
      restaurants.name = name
      restaurants.name_en = name_en
      restaurants.category = category
      restaurants.image = image
      restaurants.location = location
      restaurants.phone = phone
      restaurants.google_map = google_map
      restaurants.rating = rating
      restaurants.description = description
      return Restaurant.create()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))    
})

/*
//送出編輯結果
router.put('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  console.log('id:',id)
  // const name = req.body.name
  const {name, name_en, category, image, location, phone, google_map, rating, description } = req.body //解構賦值
  return Restaurant.find({'id' : id})
    .then(restaurants => {
      // restaurants.id = parseInt(id) 
      restaurants.name = name
      restaurants.name_en = name_en
      restaurants.category = category
      restaurants.image = image
      restaurants.location = location
      restaurants.phone = phone
      restaurants.google_map = google_map
      restaurants.rating = rating
      restaurants.description = description
      return Restaurant.create()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})*/

//查詢
app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
    res.render('index', { restaurants: restaurants, keyword: keyword })
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})