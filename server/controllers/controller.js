const chalk = require("chalk")

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
  getCart: async (req, res) => {
    console.log(chalk.red("hit getCart", req.params))
    const { cus_id } = req.params
    const db = req.app.get("db")
    
    try {
      let cart = await db.get_cart(cus_id)
      return res.status(200).send(cart)
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  addToCart: (req, res) => {
    console.log(chalk.red("hit editCart", req.params, req.body))
    const { cus_id } = req.params
    const { product_id } = req.body
    const db = req.app.get("db")

    // MAY NEED AN AWAIT HERE. BE AWARE
    try {
      db.add_to_cart([cus_id, product_id])
      return res.sendStatus(201)
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  deleteItem: (req, res) => {
    console.log(chalk.red("hit deleteItem", req.params))
    const { cart_id } = req.params
    const db = req.app.get("db")

    // MAY NEED AN AWAIT HERE. BE AWARE
    try {
      db.delete_item([cart_id])
      return res.sendStatus(200)
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  clearCart: (req, res) => {
    console.log(chalk.red("hit clearCart", req.params))
    const { cus_id } = req.params
    const db = req.app.get("db")

    // MAY NEED AN AWAIT HERE. BE AWARE
    try {
      db.clear_cart([cus_id])
      return res.sendStatus(200)
    } catch (err) {
      return res.sendStatus(500)
    }
  },
}

