// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const routes = require('./routes')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
//資料庫連線
require('./config/mongoose')



const usePassport = require('./config/passport')

const app = express()
const port = process.env.PORT

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

//使用layout既定格式
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
)

//CSS的存放位置
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

usePassport(app)

app.use(flash())


app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    res.locals.error_msg = req.flash('error')
    next()
})

app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})