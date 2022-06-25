const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const express = require('express');
const onError = require('./middlewares/onError');
const app = express();
const colors = require('colors');
const dbConnect = require('./config/dbConnect');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const chatsRoute = require('./routes/chatsRoute');
const sendResponse = require('./middlewares/sendResponse');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;
const authRoute = require('./routes/authRoute');
const productsRoute = require('./routes/productsRoute');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

//database connection
require('./config/dbconnection')


app.use(cookieParser({
    secret: process.env.COOKIE_SECRET, //TODO: change this
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production' ? true : false

}));


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use('/api', authRoute);
app.use('/api', productsRoute)


app.get('/', (req, res)=> {
    res.render('index')
})

app.get('/index', (req, res)=> {
    res.render('index')
})

app.get('/about', (req, res)=> {
    res.render('about')
})

app.get('/upload', (req, res)=> {
    res.render('upload')
})

app.get('/signup', (req, res)=> {
     res.render('signup')
})

app.get('/login', (req, res)=> {
    res.render('login')
})


app.get('/crafts', (req, res)=> {
    res.render('crafts-sales')
})

app.get('/cart', (req, res)=> {
    res.render('cart')
})

app.get('/detail', (req, res)=> {
    res.render('craftsDetail')
})

app.get('/services', (req, res)=> {
    res.render('craftsService')
})

app.get('/craftsmanSignup', (req, res)=> {
    res.render('craftsmanSignup')
})

app.get('/craftsmanLogin', (req, res)=> {
    res.render('craftsmanLogin')
})

app.get('/craftsmanDetail', (req, res)=> {
    res.render('craftsmanDetail')
})

app.get('/profile', (req, res)=> {
    res.render('profile')
})

app.get('/upload', (req, res)=> {
    res.render('upload')
})

app.get('/contact', (req, res)=> {
    res.render('contact')
})
const port = 3000

app.use(onError)
app.listen(port, ()=>{
    console.log('Server has started on port ${port}')
})