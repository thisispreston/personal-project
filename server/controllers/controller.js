const chalk = require("chalk")

module.exports = {
  getProducts: async (req, res) => {
    console.log(chalk.red("hit getProducts"))
    const db = req.app.get("db")
    
    try {
      let products = await db.all_products();
      return res.status(201).send(products);
    } catch (err) {
      return res.sendStatus(500);
    }
  },
  getCart: async (req, res) => {
    console.log(chalk.red("hit getCart", req.params))
    const { cus_id } = req.params
    const db = req.app.get("db")
    
    try {
      let cart = await db.get_cart(cus_id);
      return res.status(201).send(cart);
    } catch (err) {
      return res.sendStatus(500);
    }
  },
  addToCart: (req, res) => {
    console.log(chalk.red("hit editCart", req.params, req.body))
    const { product_id } = req.params
    const { cus_id } = req.body
    const db = req.app.get("db")

    try {
      let newCart = await db.add_to_cart([cus_id, product_id]);
      return res.status(201).send(newCart);
    } catch (err) {
      return res.sendStatus(500);
    }
  },
  deleteCart: (req, res) => {
    console.log(chalk.red("hit deleteCart"))
    const { cart_id } = req.params
    const db = req.app.get("db")

    try {
      let newCart = await db.add_to_cart([cart_id]);
      return res.status(201).send(newCart);
    } catch (err) {
      return res.sendStatus(500);
    }
  },
};

