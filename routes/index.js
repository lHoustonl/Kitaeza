const { Router } = require('express')
const { each } = require('jquery')
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
        Authorization: 'Token ' + t
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

    // sendRequest('POST', url + 'productsCharacteristics/', {
    //     characName: 'Вязкость',
    //     description: '10W40',
    //     product: '60be6c379102300015af8f5c'
    // }, authHeader(token)).then(data => {
    //     console.log(data)
    //     console.log(token)
    // })
    // sendGetRequest(url + 'products/').then(data => {
    //     console.log(data)
    // })
    // sendRequest('POST', url + 'categories/', {
    //     title: 'Автомобильные масла',
    //     description: 'Масла для автомобилей'
    // }, authHeader(token)).then(data => {
    //     console.log(data)
    //     console.log(token)
    // })
    // sendGetRequest(url + 'products/').then(data => {
    //     console.log(data)
    // })
})

router.get('/help', (req, res) => {
    res.render('help', {
        title: token,
        hideHeader,
        isLoggedIn,
        email
    })
})

router.get('/help/terms', (req, res) => {
    res.render('help-terms', {
        title: token,
        hideHeader,
        isLoggedIn,
        email
    })
})

router.get('/help/shipping-cost', (req, res) => {
    res.render('help-shipping-cost', {
        title: token,
        hideHeader,
        isLoggedIn,
        email
    })
})

router.get('/help/shipping-types', (req, res) => {
    res.render('help-shipping-types', {
        title: token,
        hideHeader,
        isLoggedIn,
        email
    })
})

router.get('/help/order-making', (req, res) => {
    res.render('help-order-making', {
        title: token,
        hideHeader,
        isLoggedIn,
        email
    })
})

router.get('/help/payment-methods', (req, res) => {
    res.render('help-payment-methods', {
        title: token,
        hideHeader,
        isLoggedIn,
        email
    })
})

router.get('/help/order-canceling', (req, res) => {
    res.render('help-order-canceling', {
        title: token,
        hideHeader,
        isLoggedIn,
        email
    })
})

router.get('/help/address', (req, res) => {
    res.render('help-address', {
        title: token,
        hideHeader,
        isLoggedIn,
        email
    })
})

router.get('/help/working-time', (req, res) => {
    res.render('help-working-time', {
        title: token,
        hideHeader,
        isLoggedIn,
        email
    })
})

router.get('/help/shop-info', (req, res) => {
    res.render('help-shop-info', {
        title: token,
        hideHeader,
        isLoggedIn,
        email
    })
})

router.get('/logout', (req, res) => {
    isLoggedIn = false
    res.redirect('/')
})

router.get('/favorites', (req, res) => {
    res.render('favorites', {
        title: token,
        hideHeader,
        isLoggedIn,
        email
    })
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
    var product = await sendGetRequest(url + 'products/')
    res.render('catalog', {
        title: 'Каталог',
        isLoggedIn,
        Source: '/product-img2.png',
        email,
        products: product
    })
})

router.get('/catalog/:id', async (req, res) => {
    var product = await sendGetRequest(url + 'products/productCategory/' + req.params.id)
    res.render('catalog', {
        title: 'Ходовые части',
        isLoggedIn,
        Source: '/product-img2.png',
        email,
        products: product
    })
})

var product = {
    imageurl: 'product-img2.png',
    title: 'Моторное масло',
    subtitle: 'MOTUL 5100 4T',
    price: '1234',
    availability: true,
    description: 'Handlebars-хелпер представляет собой простой идентификатор, за которым следуют ноль или более параметров (через пробел). Каждый параметр представляет собой handlebars-выражение. Параметром хелпера может также являться простая строка, число или логическое значение. Хелпер производит определенные операции с параметрами и возвращает HTML код.'
}

var characteristics = {
    characteristics: {
        characName: 'Тип',
        description: 'Масло'
    }
}

router.get('/product/:id', async (req, res) => {
    var product
    var availability = false
    var characteristics
    await sendGetRequest(url + 'products/' + req.params.id).then(data => {
        product = data
    })
    if (product.product.amount > 0) {
        availability = true
    }
    await sendGetRequest(url + 'productsCharacteristics/productCharacteristicsbyproduct/' + req.params.id).then(data => {
        characteristics = data
    })
    res.render('product', {
        title: product.product.title,
        product: product.product,
        characteristics: characteristics,
        availability,
        isLoggedIn,
        hideHeader,
        email
    })
})

router.get('/product', async (req, res) => {
    res.render('product', {
        title: 'Товар',
        isLoggedIn,
        hideHeader,
        product,
        characteristics,
        email
    })
})

router.get('/admin-panel', async (req, res) => {
    var product = await sendGetRequest(url + 'products/')
    res.render('admin-panel', {
        title: 'Панель администрирования',
        hideHeader,
        product: product,
        email
    })
})

router.get('/admin-panel/add-category', async (req, res) => {
    var category = await sendGetRequest(url + 'categories/')
    res.render('add-category', {
        title: 'Добавить категорию',
        hideHeader,
        category: category,
        email
    })
})

router.get('/admin-panel/edit-category', async (req, res) => {
    var category = await sendGetRequest(url + 'categories/')
    res.render('edit-category', {
        title: 'Изменить категорию',
        hideHeader,
        category,
        email
    })
})

router.get('/admin-panel/add-user', async (req, res) => {
    var user = await sendGetRequest(url + 'users/')
    res.render('add-user', {
        title: 'Добавить пользователя',
        hideHeader,
        user: user,
        email
    })
})

router.get('/admin-panel/edit-user', async (req, res) => {
    var user = await sendGetRequest(url + 'users/')
    res.render('edit-user', {
        title: 'Изменить пользователя',
        hideHeader,
        user: user,
        email
    })
})

router.get('/admin-panel/add-product', async (req, res) => {
    var product = await sendGetRequest(url + 'products/')
    var category = await sendGetRequest(url + 'categories/')
    res.render('add-product', {
        title: 'Добавить товар',
        hideHeader,
        product: product,
        category: category,
        email
    })
})

router.get('/admin-panel/edit-product', async (req, res) => {
    var product = await sendGetRequest(url + 'products/')
    res.render('edit-product', {
        title: 'Изменить товар',
        hideHeader,
        product: product,
        email
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
        }).then(data => {
            console.log(data)
        })
        await sendRequest('POST', url + 'userCredentials/', {
            user: id,
            email: email,
            name: req.body.fname,
            surname: req.body.lname
        }).then(data => {
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
        await sendRequest('POST', url + 'users/login', { 
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

router.post('/add-product', async (req, res) => {
    sendRequest('POST', url + 'products/', {
        title: req.body.title,
        subtitle: req.body.subtitle,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        amount: req.body.amount,
        imageurl: req.body.imageurl
    }, authHeader(token)).then(data => {
        console.log(data)
        res.redirect('/admin-panel/add-product')
    })
})

router.post('/add-category', async (req, res) => {
    sendRequest('POST', url + 'categories/', {
        title: req.body.title,
        description: req.body.description
    }, authHeader(token)).then(data => {
        console.log(data)
        res.redirect('/admin-panel/add-category')
    })
})

module.exports = router