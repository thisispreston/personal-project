const bcrypt = require("bcryptjs");
const chalk = require("chalk");

module.exports = {
  login: async (req, res) => {
    const db = req.app.get("db").auth;
    const { username, password } = req.body;

    let cus = await db.check_cus(username);
    cus = cus[0];
    if (!cus) {
      return res.status(404).send("Username not found");
    }

    const authenticated = bcrypt.compareSync(password, cus.password);
    if (authenticated) {
      delete cus.password;
      req.session.customer = cus;
      return res.status(202).send(req.session.customer);
    } else {
      return res.status(404).send("Incorrect username or password");
    }
  },
  register: async (req, res) => {
    const db = req.app.get("db").auth;
    const { username, email, password } = req.body;

    let cus = await db.check_cus(username);
    cus = cus[0];
    if (cus) {
      return res.status(409).send("Username already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    try {
      let newCus = await db.register_cus({ username, hash, email });
      newCus = newCus[0];
      req.session.customer = newCus;
      return res.status(201).send(req.session.customer);
    } catch (err) {
      return res.sendStatus(500);
    }
  },
  edit: async (req, res) => {
    const db = req.app.get("db").auth;
    const { username, email } = req.body;
    const { id } = req.params

    let cus = await db.check_cus(username);
    if (cus[0] && cus[0].username !== username) {
        return res.status(409).send("Username already exists.")
    }

    let editedCus = await db.edit_cus({ id, username, email })
    editedCus = editedCus[0]
    if (editedCus) {
      req.session.customer = editedCus
      return res.status(202).send(req.session.customer)
    } else {
      return res.status(500).send("Unable to edit account information.")
    }
  },
  delete: async (req, res) => {
    console.log(chalk.red("hit delete"))
    const db = req.app.get("db").auth
    const { username, password } = req.body
    const { id } = req.params
    
    let cus = await db.check_cus(username)
    cus = cus[0]
    if (!cus) {
      return res.status(404).send("Username not found")
    }
    
    const authenticated = bcrypt.compareSync(password, cus.password)
    if (authenticated) {
      delete cus.password
      await db.delete_cus(id)
      return res.sendStatus(200);
    } else {
      return res.status(500).send("Unable to delete account information. Please try again.")
    }
  },
  logout: (req, res) => {
    console.log(chalk.red("hit logout"))
    if (req.session) {
      req.session.destroy()
    }
    return res.sendStatus(200)
  }
};

//KEEP AN EYE ON CUS vs CUSTOMER, IT MAY CAUSE PROBLEMS LATER!!