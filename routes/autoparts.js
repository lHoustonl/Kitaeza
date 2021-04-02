const { Router } = require('express')
const Autopart = require('../models/Autopart')
const User = require('../models/User')
const router = Router()
var currentUser
var isLoggedIn = false

router.get('/', async (req, res) => {
    const users = await User.find({}).lean()
    if(isLoggedIn) {
        res.render('index', {
            title: 'Main page',
            users,
            currentUser,
            isLoggedIn
        })
    }
    else {
        res.render('index', {
            title: 'Main page',
            users,
            isLoggedIn
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
        isLoggedIn
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
    user = await User.findOne({
        login: req.body.login,
        password: req.body.password
    }).lean()
    if(user)
    {
        isLoggedIn = true
        currentUser = user
        res.redirect('/')
    }
    else
    {
        console.log(user)
    }
})

module.exports = router