const chalk = require("chalk")
const stripe = require('stripe')(process.env.STRIPE_SECRET)

module.exports = {
  getProducts: async (req, res) => {
    console.log(chalk.red("hit getProducts"))
    const db = req.app.get("db")
    
    try {
      let products = await db.all_products()
      return res.status(200).send(products)
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  getOneProduct: async (req, res) => {
    console.log(chalk.red("hit getOneProduct"))
    const { id } = req.params
    const db = req.app.get("db")
    
    try {
      let product = await db.get_product(id)
      return res.status(200).send(product)
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  getCart: async (req, res) => {
    console.log(chalk.red("hit getCart"))
    const { id } = req.params
    const db = req.app.get("db")
    
    try {
      let cart = await db.get_cart(id)
      return res.status(200).send(cart)
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  addToCart: (req, res) => {
    console.log(chalk.red("hit addToCart"))
    const { id } = req.params
    const { prod_id } = req.body
    const db = req.app.get("db")

    try {
      db.add_to_cart([id, prod_id])
      return res.sendStatus(201)
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  deleteItem: async (req, res) => {
    console.log(chalk.red("hit deleteItem"))
    const { id } = req.params
    const db = req.app.get("db")

    // MAY NEED AN AWAIT HERE. BE AWARE
    try {
      await db.delete_item([id])
      return res.sendStatus(200)
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  clearCart: async (req, res) => {
    console.log(chalk.red("hit clearCart"), req.params)
    const { id } = req.params
    const db = req.app.get("db")

    // MAY NEED AN AWAIT HERE. BE AWARE
    try {
      await db.clear_cart([id])
      return res.sendStatus(200)
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  placeOrder: (req,res) => {
    console.log(chalk.red("hit placeOrder"))

    const db = req.app.get('db')
    const cus_id = req.params.id
    const {token:{id}, total, cart} = req.body;

    let product_ids = cart.map(e => {
      return e.prod_id
    })
    console.log(product_ids)

    stripe.charges.create(
      {
        amount: total,
        currency: 'usd',
        source: id,
        description: 'Test Charge'
      },
      async (err, charge) => {
        if (err) {
          console.log(err)
          return res.status(500).send(err)
        } else {
          console.log(chalk.blue("Order successful"))
          let { fingerprint } = charge.source
          let orderID = await db.orders([cus_id, total, fingerprint])
          await db.orders_products([orderID, product_ids])
          return res.status(200).send(charge)
        }
      }
    )
  },
}


