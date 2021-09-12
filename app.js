// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

//載入express-handlebars
const exphbs = require('express-handlebars')
// const restaurantList = require('./restaurant.json')
const restaurantList = require('./restaurant.json')
//使用layout既定格式
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
//告訴nodemon CSS的存放位置
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
    // create a variable to store restaurant
    // console.log('restaurant:', restaurantList.results)
    // past the restaurant data into 'index' partial template
    // res.render('index', { restaurants: restaurantList.results})
    res.render('index', { restaurants: restaurantList.results})
})


app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurants = restaurantList.results.filter( item => item.id.toString() === req.params.restaurant_id)
    res.render('show', { restaurant: restaurants[0] })
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
    res.render('index', { restaurants: restaurants, keyword: keyword })
})



// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})