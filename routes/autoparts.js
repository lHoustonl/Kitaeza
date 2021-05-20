const { Router } = require('express')
const { Mongoose } = require('mongoose')
const Autopart = require('../models/Autopart')
const Cart = require('../models/Cart')
const User = require('../models/User')
const router = Router()
var currentUser
var isLoggedIn = false
let ITEMS_IN_BASKET = []
var hide = 'hide'

router.get('/', async (req, res) => {
    const users = await getUser(true)
    if(isLoggedIn) {
        res.render('index', {
            title: 'Main page',
            users,
            currentUser,
            isLoggedIn,
            hide
        })
    }
    else {
        res.render('index', {
            title: 'Main page',
            users,
            isLoggedIn,
            hide
        })
    }
})

router.get('/authorization', (req, res) => {
    res.render('authorization', {
        title: 'Login page',
        isLoggedIn
    })
})

router.get('/registration', (req, res) => {
    res.render('registration', {
        title: 'Register page',
        isLoggedIn,
        hide
    })
})

router.get('/logout', (req, res) => {
    isLoggedIn = false
    res.redirect('/')
})

router.post('/registration', (req, res) => {
    User.exists({login: req.body.login}, async function(err, data){
        if (data == true) {
            res.redirect('/registration')
        }
        else {
            const user = new User({
                login: req.body.login,
                password: req.body.password
            })
            await user.save(function(err){
                if (err){
                    console.log(`Error Saving to DB: ${err}`)
                    res.redirect('/register')
                }
                else {
                    res.redirect('/')
                }
            })
        }
    })
})

router.post('/authorization', async (req, res) => {
    user = await getUser(false, req.body.login, req.body.password)
    if(user)
    {
        isLoggedIn = true
        currentUser = user
        res.redirect('/')
    }
    else
    {
        console.log(user)
        res.redirect('/')
    }
})

router.get('/basket', (req, res) => {
    res.render('basket', {
        title: 'Корзина',
        isLoggedIn
    })
})

router.get('/orders', (req, res) => {
    res.render('orders', {
        title: 'Заказы',
        isLoggedIn
    })
})

router.get('/catalog', (req, res) => {
    res.render('catalog', {
        title: 'Каталог',
        isLoggedIn,
        Source: '/product-img2.png'
    })
})

var product = {
    source: 'product-img2.png',
    title: 'Моторное масло',
    subtitle: 'MOTUL 5100 4T',
    price: '1234',
    availability: true,
    characteristics: {
        title: 'Тип',
        description: 'Масло'
    },
    description: 'Handlebars-хелпер представляет собой простой идентификатор, за которым следуют ноль или более параметров (через пробел). Каждый параметр представляет собой handlebars-выражение. Параметром хелпера может также являться простая строка, число или логическое значение. Хелпер производит определенные операции с параметрами и возвращает HTML код.'
}

router.get('/product', (req, res) => {
    res.render('product', {
        title: 'Item12345',
        isLoggedIn,
        hide,
        product
    })
})

async function getUser (Many, login, password){
    if(Many)
    {
        users = await User.find({}).lean()
        return users
    }
    return await User.findOne({
        login: login,
        password: password
    }).lean()
}

async function addUserTest(howManyTimes){
    for(i = 0; i < howManyTimes; i++){
        var assert = require('chai').assert

        function getRandomInt(max){
            return Math.floor(Math.random() * max)
        }
        
        var testLogin = 'testUsername' + getRandomInt(100) + '@gmail.com'
        console.log(testLogin)
        var testPassword = getRandomInt(100) + 'testPassword' + getRandomInt(100)
        console.log(testPassword)

        var user = new User({ login: testLogin, password: testPassword })

        var result = true

        try{
            await addUser(user)
        }
        catch(e){
            result = false
        }
        console.log(result)
    
        assert.isTrue(result, 'Error, test failed')
    }
}

// addUserTest(10)

async function addUser(user){
    await user.save(function(err){
        if (err){
            console.log(`Error Saving to DB: ${err}`)
        }
    })
}

// router.get('/addToBasket', async (req, res) => {
//     if(currentUser)
//     {

//     }
//     else
//     {

//     }
// })

module.exports = router