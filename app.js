// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

//download restaurant.json
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

//set show page
app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log('req.params', req.params.restaurant_id)
  const restaurant = restaurantList.results.filter(restaurant => {
    restaurant.id.toString() === req.params.restaurant_id
  })
  res.render('show', { restaurant: restaurantList.results[0] })
})

//search route
app.get('/search', (req, res) => {
  console.log('req.query', req.query.keyword)
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name.includes(keyword)
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

//setting static files
app.use(express.static('public'))

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})