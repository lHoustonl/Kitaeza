const { Router } = require('express')
const router = Router()
const fetch = require('node-fetch')
const url = 'https://kitaeza-api.herokuapp.com/api/'
const hideHeader = 'hide'
var isLoggedIn = false
var email
var token

const defaultHeaders = {
    'Content-Type': 'application/json'
}

function authHeader(t) {
    return authorizedHeaders = {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token
    }
}

async function sendRequest(method = 'GET', url = '', body = null, headers = defaultHeaders) {
    const response = await fetch(url, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: headers,
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(body) // body data type must match "Content-Type" header
    })
    
    return await response.json()
    // if (response.ok) { // parses JSON response into native JavaScript objects
    // }
    // Реализовать обработку ошибок
}

async function sendGetRequest(url = '', headers) {
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: headers
    })

    if (response.ok) {
        return await response.json() // parses JSON response into native JavaScript objects
    }
    // Реализовать обработку ошибок
}

router.get('/', async (req, res) => {
    res.render('index', {
        title: 'Китаёза',
        isLoggedIn,
        email
    })
    sendGetRequest(url + 'products/', authHeader(token)).then(data => {
        console.log(data)
    })
    // sendRequest() 
    // Получить товары для блоков рекомендаций
})

router.get('/help', (req, res) => {
    res.render('help', {
        title: token,
        hideHeader,
        isLoggedIn,
        email
    })
})

router.get('/registration', (req, res) => {
    res.render('registration', {
        title: 'Регистрация',
        hideHeader,
        isLoggedIn,
        email
    })
})

router.get('/logout', (req, res) => {
    isLoggedIn = false
    res.redirect('/')
})

router.get('/basket', (req, res) => {
    res.render('basket', {
        title: 'Корзина',
        isLoggedIn,
        hideHeader,
        email
    })
})

router.get('/orders', (req, res) => {
    res.render('orders', {
        title: 'Заказы',
        isLoggedIn,
        hideHeader,
        email
    })
})

router.get('/catalog', async (req, res) => {
    var product
    await sendGetRequest(url + 'products/', authHeader(token)).then(data => {
        product = data
    })
    res.render('catalog', {
        title: 'Каталог',
        isLoggedIn,
        Source: '/product-img2.png',
        email
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
    sendGetRequest(url + 'products/', authHeader(token)).then(data => {
        console.log(data)
    })
    res.render('product', {
        title: 'Item12345',
        isLoggedIn,
        hideHeader,
        product,
        email
    })
})

router.get('/admin-panel', async (req, res) => {
    var product
    await sendGetRequest(url + 'products/', authHeader(token)).then(data => {
        product = data
    })
    res.render('admin-panel', {
        title: 'Панель администрирования',
        hideHeader,
        product: product
    })
})

router.get('/admin-panel/add-category', async (req, res) => {
    var category
    await sendGetRequest(url + 'categories/', authHeader(token)).then(data => {
        category = data
    })
    res.render('add-category', {
        title: 'Добавить категорию',
        hideHeader,
        category: category
    })
})

router.get('/admin-panel/edit-category', async (req, res) => {
    var category
    await sendGetRequest(url + 'categories/', authHeader(token)).then(data => {
        category = data
    })
    res.render('edit-category', {
        title: 'Изменить категорию',
        hideHeader,
        category
    })
})

router.get('/admin-panel/add-user', async (req, res) => {
    var user
    await sendGetRequest(url + 'users/', authHeader(token)).then(data => {
        user = data
    })
    res.render('add-user', {
        title: 'Добавить пользователя',
        hideHeader,
        user: user
    })
})

router.get('/admin-panel/edit-user', async (req, res) => {
    var user
    await sendGetRequest(url + 'users/', authHeader(token)).then(data => {
        user = data
    })
    res.render('edit-user', {
        title: 'Изменить пользователя',
        hideHeader,
        user: user
    })
})

router.get('/admin-panel/add-product', async (req, res) => {
    var product
    await sendGetRequest(url + 'products/', authHeader(token)).then(data => {
        product = data
    })
    console.log(product)
    res.render('add-product', {
        title: 'Добавить товар',
        hideHeader,
        product: product
    })
})

router.get('/admin-panel/edit-product', async (req, res) => {
    var product
    await sendGetRequest(url + 'products/', authHeader(token)).then(data => {
        product = data
    })
    console.log(product)
    res.render('edit-product', {
        title: 'Изменить товар',
        hideHeader,
        product: product
    })
})

router.post('/registration', async (req, res) => {
    try {
        var id
        await sendRequest('POST', url + 'users/', { 
            user: {
                email: req.body.email,
                password: req.body.password
            }
         }).then(data => {
            token = data.user.token
            email = data.user.email
            id = data.user._id
        })
        console.log(id)
        await sendRequest('POST', url + 'baskets/', {
            user: id
        }, authHeader(token)).then(data => {
            console.log(data)
        })
        await sendRequest('POST', url + 'userCredentials/', {
            user: id,
            email: email,
            name: req.body.fname,
            surname: req.body.lname
        }, authHeader(token)).then(data => {
            console.log(data)
            isLoggedIn = true
            res.redirect('/')
        })
    }
    catch {
        res.redirect('/registration')
    }
})

router.post('/authorization', async (req, res) => {
    try {
        await sendRequest('POST', 'https://kitaeza-api.herokuapp.com/api/users/login', { 
            user: {
                email: req.body.email,
                password: req.body.password
            }
         }).then(data => {
            token = data.user.token
            email = data.user.email
            isLoggedIn = true
            res.redirect('/')
        })
    }
    catch {
        res.redirect('/registration')
    }
})

module.exports = router