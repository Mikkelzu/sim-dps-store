const createErrors = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')

let app = express()

//view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//logger stuff
app.use(logger('dev'))

// express setup
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

//set static files (css and image files)
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// catch 404 and send to errror handler
app.use((req, res, next) => {
    next(createErrors(404))
})

app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.render('error')
})


module.exports = app;