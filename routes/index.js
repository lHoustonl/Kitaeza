const { Router } = require('express')
const { each } = require('jquery')
const router = Router()
const fetch = require('node-fetch')
const url = 'https://kitaeza-api.herokuapp.com/api/'
const hideHeader = 'hide'
var isLoggedIn = false
var email
var token
var userid

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
}

async function sendGetRequest(url = '', headers) {
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: headers
    })

    return await response.json()
}

router.get('/', async (req, res) => {
    var products = await sendGetRequest(url + 'products/')
    res.render('index', {
        title: 'Китаёза',
        isLoggedIn,
        email,
        products,
        userid
    })
})

router.get('/help', (req, res) => {
    res.render('help', {
        title: 'Помощь',
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

router.get('/basket', async (req, res) => {
    if (token == null) {
        var products = await sendGetRequest(url + 'products/')
        res.render('basket', {
            title: 'Корзина',
            isLoggedIn,
            hideHeader,
            email,
            products
        })
    }
    else {
        var p = []
        var basket = await sendGetRequest(url + 'baskets/basketsbyuser/' + userid)
        var product = await sendGetRequest(url + 'baskets/getProductsFromInstancesOfBasket/' + basket[0]._id).then(async data => {
            console.log(data)
            for (var i = 0; i < data.length; i++) {
                p.push(data[i].instanceDetails[0])
            }
            var products = await sendGetRequest(url + 'products/')
            console.log(basket)
            console.log(p)
            res.render('basket', {
                title: 'Корзина',
                isLoggedIn,
                hideHeader,
                email,
                products,
                product: p,
                basketId: basket[0]._id
            })
        })

        // try {

        // }
        // catch {
        //     var basket = await sendGetRequest(url + 'baskets/basketsbyuser/' + userid)
        //     var products = await sendGetRequest(url + 'products/')
        //     console.log(basket)
        //     res.render('basket', {
        //         title: 'Корзина',
        //         isLoggedIn,
        //         hideHeader,
        //         email,
        //         products,
        //         basketId: basket[0]._id
        //     })
        // }
    }
})

router.get('/basket/:id', async (req, res) => {
    try {
        var p = []
        var basket = await sendGetRequest(url + 'baskets/basketsbyuser/' + userid)
        await sendRequest('POST', url + 'productInstances/', {
            product: req.params.id,
            basket: basket[0]._id,
            amount: 1
        }, authHeader(token))
        var product = await sendGetRequest(url + 'baskets/getProductsFromInstancesOfBasket/' + basket[0]._id)
        for (var i = 0; i < data.length; i++) {
            p.push(data[i].instanceDetails[0])
        }
        var products = await sendGetRequest(url + 'products/')
        console.log(product)

        res.render('basket', {
            title: 'Корзина',
            isLoggedIn,
            hideHeader,
            email,
            products,
            product: p,
            basketId: basket[0]._id
        })
    }
    catch {
        res.redirect('/basket')
    }
})

router.get('/orders', async (req, res) => {
    var order = await sendGetRequest(url + 'orders/ordersbyuser/' + userid,)
    var products = await sendGetRequest(url + 'products/')
    res.render('orders', {
        title: 'Заказы',
        isLoggedIn,
        hideHeader,
        email,
        order,
        products
    })
})

router.get('/orders/:id', async (req, res) => {
    await sendRequest('POST', url + 'baskets/basketToOrderEmailNotify', {
        basketId: req.params.id
    }, authHeader(token)).then(data => {
        console.log(data)
    })
    res.redirect('/orders')
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
    var product = await sendGetRequest(url + 'products/' + req.params.id)
    var products = await sendGetRequest(url + 'products/')
    var availability = false
    var characteristics
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
        products,
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

router.get('/registration', (req, res) => {
    res.render('registration', {
        title: 'Регистрация',
        hideHeader,
        isLoggedIn,
        email,
        userid
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
        await sendRequest('POST', url + 'users/', { 
            email: req.body.email,
            password: req.body.password
        }).then(data => {
            token = data.user.token
            email = data.user.email
            userid = data.user._id
            isLoggedIn = true
            res.redirect('/')
        })
        console.log(userid)
    }
    catch {
        res.redirect('/registration')
    }
})

router.post('/authorization', async (req, res) => {
    try {
        await sendRequest('POST', url + 'users/login', {
                email: req.body.email,
                password: req.body.password
         }).then(data => {
            token = data.user.token
            email = data.user.email
            userid = data.user._id
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