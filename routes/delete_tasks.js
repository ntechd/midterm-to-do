db.query(`UPDATE tasks SET is_active = FALSE WHERE id = $1;);`,[id])
.then(data => {
  const tasks = data.rows[0];
  res.json({ tasks });
})
.catch(err => {
  res
    .status(500)
    .json({ error: err.message });
});