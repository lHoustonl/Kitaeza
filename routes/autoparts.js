const { Router } = require('express')
const Autopart = require('../models/Autopart')
const User = require('../models/User')
const router = Router()

router.get('/', async (req, res) => {
    const users = await User.find({}).lean()
    console.log(users)
    res.render('index', {
        title: 'Main page',
        users
    })
})

router.get('/authorization', (req, res) => {
    res.render('authorization', {
        title: 'Login page'
    })
})

router.get('/registration', (req, res) => {
    res.render('registration', {
        title: 'Register page'
    })
})

router.post('/registration', async (req, res) => {
    const user = new User({
        login: req.body.login,
        password: req.body.password
    })

    await user.save()
    res.redirect('/')
})

module.exports = router