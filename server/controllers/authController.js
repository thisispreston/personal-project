const bcrypt = require("bcryptjs");
const chalk = require("chalk");

module.exports = {
  login: async (req, res) => {
    console.log(chalk.red("hit login", req.body));
    const db = req.app.get("db").auth;
    const { username, password } = req.body;

    let cus = await db.check_cus(username);
    cus = cus[0];
    if (!cus) {
      return res.status(400).send("Username not found");
    }

    const authenticated = bcrypt.compareSync(password, cus.password);
    if (authenticated) {
      delete cus.password;
      req.session.customer = cus;
      return res.status(202).send(req.session.customer);
    } else {
      return res.status(400).send("Incorrect username or password");
    }
  },
  register: async (req, res) => {
    console.log(chalk.red("hit register", req.body));
    const db = req.app.get("db").auth;
    const { username, email, password } = req.body;

    let cus = await db.check_cus(username);
    cus = cus[0];
    if (cus) {
      return res.status(400).send("Username already exists");
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
    console.log(chalk.red("hit edit", req.body));
    const db = req.app.get("db").auth;
    const { username, email } = req.body;

    try {
      let editedCus = await db.edit_cus([username, email])
      editedCus = editedCus[0];
      req.session.customer = editedCus;
      return res.status(201).send(req.session.customer);
    } catch (err) {
      return res.sendStatus(500);
    }
  },
  delete: async (req, res) => {
    console.log(chalk.red("hit delete", req.params));
    const db = req.app.get("db").auth;
    const { username, password } = req.body;
    const { id } = req.params

    let cus = await db.check_cus(username);
    cus = cus[0];

    const authenticated = bcrypt.compareSync(password, cus.password);
    if (authenticated) {
      delete cus.password;
      let cusDeleted = await db.delete_cus(id);
      return res.status(202).send(cusDeleted);
    } else {
      return res.status(400).send("Unable to delete account");
    }
  },
  logout: (req, res) => {
    console.log(chalk.red("hit logout"));
    if (req.session) {
      req.session.destroy()
    }
    return res.sendStatus(200)
  }
};

//KEEP AN EYE ON CUS vs CUSTOMER, IT MAY CAUSE PROBLEMS LATER!!