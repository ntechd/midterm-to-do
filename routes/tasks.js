const express = require('express');
const router = express.Router();
const { isMovie, isRestaurant, isBook } = require('../helper-functions/find-category');

const addNewTask = function (db, task, category, userId) {
  console.log(task);
  db.query(`SELECT id FROM categories where name = $1`, [category])
    .then(data => {

      db.query(`INSERT INTO tasks (name,category_id,user_id)
    VALUES($1,$2,$3) `, [task, data.rows[0]['id'], userId]); //need to change user id once we set session cookies.
    })// data.rows[0]['id']

}

module.exports = (db) => {

  console.log('connect');
// delete data

  router.get("/", (req, res) => {

    const userId = req.session.userId;
    console.log(req.session.userId);
    db.query(`SELECT t.id, t.name AS task_name,c.name AS category_name FROM tasks AS t
            JOIN categories AS c ON t.category_id = c.id
            JOIN users AS u on u.id = t.user_id
            where t.user_id = $1 AND is_active = TRUE;
            `, [userId])
      .then(data => {
        const tasks = data.rows;
        res.json( tasks );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  //router.get("/", (req, res) => {
  //  db.query(`SELECT * FROM tasks;`)
  //    .then(data => {
  //      const users = data.rows;
  //      res.json({ users });
  //    })
  //    .catch(err => {
  //      res
  //        .status(500)
  //        .json({ error: err.message });
  //    });
  //});

  router.post("/new", (req, res) => {
    const task = req.body.content;
    const userId = req.session.userId;
    isMovie(task).then(
      (movie) => {
        if (movie['results'] && movie['results'][0] && movie['results'][0].title.toUpperCase() === task.toUpperCase()) {
          console.log("Category of Task is ---to_watch");
          addNewTask(db, task, 'to_watch', userId);
          res.end();
        } else {
          return task;
        }
      }).then((task) => {
        if (!task) return;
        isBook(task).then(({ results }) => {
          console.log("Book results----" + task);
          if (results && results[0].title.toUpperCase() === task.toUpperCase()) {
            console.log("Category of Task is----to_read");
            addNewTask(db, task, 'to_read', userId);
            res.end();
          } else {
            return task;
          }
        }).then((task) => {
          if (!task) return;
          isRestaurant(task).then((restaurant) => {
            console.log("restaurant----" + task);
            if ((restaurant && restaurant.businesses[0] && restaurant.businesses[0].name.toUpperCase() === task.toUpperCase())) {
              console.log("Category of Task is ---to_eat");
              addNewTask(db, task, 'to_eat', userId);
              res.end();
            } else {
              return task;
            }
          }).then(task => {
            if (!task) return;
            console.log("Category of Task is----to_buy", task);
            addNewTask(db, task, 'to_buy', userId);
            res.end();
          })

        }).catch(err => console.log(err.message))
      })

  })

  router.get("/:id", (req, res) => {
    const userId = req.session.userId;
    const taskId = req.params.id;
    const sql = `SELECT t.id, t.name AS task_name, is_done, c.name AS category_name FROM tasks AS t
    JOIN categories AS c ON t.category_id = c.id
    JOIN users AS u on u.id = t.user_id
    where t.id = $1;
    `
    db.query(sql, [taskId])//[userId, taskId])//removing for testing purposes we need to set in query  AND t.user_id = $2
      .then(data => {
        const tasks = data.rows;
        res.json(tasks);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //EDIT ROUTE
  router.put("/:id", (req, res) => {

    const is_done = typeof (req.body.is_done) === undefined ? false : true;
    const taskTitle = req.body.taskTitle;
    const taskId = req.body.taskId;
    const sql = `UPDATE tasks SET name = $1, is_done = $2 WHERE id = $3`
    console.log("[Task.js]---Updating a Task");
    db.query(sql, [taskTitle, is_done, taskId])
      .then(data => {
        const tasks = data.rows;
        res.end();
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

router.delete("/:id",(req,res) => {
      const task_id = req.params.id;
      const userId = req.session.userId;
      db.query(`UPDATE tasks SET is_active = FALSE WHERE id = $1;`,[task_id])
      .then(() => {
        res.end();
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });
  return router;    
}