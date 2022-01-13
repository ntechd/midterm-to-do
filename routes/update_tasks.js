db.query(`UPDATE tasks SET date_time = $1 WHERE id = $2;`,[tasks.date_time,tasks.id])
.then(data => {
  const tasks = data.rows;
  res.json({ tasks });
})
.catch(err => {
  res
    .status(500)
    .json({ error: err.message });
});