require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  ctrl = require("./controllers/controller")
  authCtrl = require("./controllers/authController"),
  checkCus = require('./middleware/checkCus'),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    rejectUnauthorized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    secret: SESSION_SECRET
  })
);

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set("db", db)
    console.log("Database Connected")
    app.listen(SERVER_PORT, () => console.log(`We're running on port: ${SERVER_PORT}`))
})

//AUTH ENDPOINTS
app.post('/api/auth/login', checkCus, authCtrl.login)
app.post('/api/auth/register', authCtrl.register)
app.post('/api/auth/logout', authCtrl.logout)
app.delete('/api/auth/delete', authCtrl.delete)
app.put('/api/auth/edit/:id', authCtrl.edit)

app.get('/api/check', checkCus)

//PRODUCT ENDPOINTS
app.get('/api/products', ctrl.getProducts)

//CART ENDPOINTS
app.get('/api/cart/:id', ctrl.getCart)
app.post('/api/cart/:id', ctrl.addToCart)
app.delete('/api/cart/:id', ctrl.clearCart) //cus_id
app.delete('/api/cart/item/:id', ctrl.deleteItem) //cart_id

