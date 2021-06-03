const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const autopartRoutes = require('./routes/autoparts')
const { mainModule } = require('process')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    helpers: {
        if_eq: function(a, b, opts) {
            return a == b ? opts.fn(this) : opts.inverse(this)
        }
    }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'static')))

app.use(autopartRoutes)

app.use(function(req,res){
    res.status(404).render('404', {
        title: '404',
        isLoggedIn: false
    })
})

async function start() {
    try{
        mongoose.connect(
            'mongodb+srv://dbadmin:e3OeKnK7KPcBnl8z@cluster0.04sre.mongodb.net/autoparts',
            {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true 
        })
        app.listen(PORT, () => {
            console.log('Server has been has been running...')
        })
    }catch(e){
        console.log(e)
    }
}

start()