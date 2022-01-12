/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {
    res.render("index")
  });

  router.get("/login/:id", (req, res) => {
    const userId = req.params.id;
    req.session.userId = userId;
        
    db.query(`SELECT * FROM users WHERE id = $1;`,[userId])
      .then(data => {
        const users = data.rows;
        req.session.user = users.name;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

    res.redirect("/");
  });
  router.post("/logout", (req, res) => {
    req.session.userId = null;
    req.session.user = null;
    res.redirect("/");
  });
  return router;
};
