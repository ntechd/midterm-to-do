db.query(`INSERT INTO tasks (name,category_id,user_id)
VALUES($1,$2,$3);`,[tasks.name,categories.id,users.id])
.then(data => {
  const tasks = data.rows;
  res.json({ tasks });
})
.catch(err => {
  res
    .status(500)
    .json({ error: err.message });
});