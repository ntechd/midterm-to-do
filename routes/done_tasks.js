db.query(`UPDATE tasks SET is_done = TRUE WHERE id = $1;;`,[tasks.id])
.then(data => {
  const tasks = data.rows;
  res.json({ tasks });
})
.catch(err => {
  res
    .status(500)
    .json({ error: err.message });
});