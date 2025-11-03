const pool = require('./db');

exports.getItemsByUser = async (userId) => {
  const result = await pool.query('SELECT * FROM items WHERE user_id = $1', [userId]);
  return result.rows;
};

exports.createItem = async (title, description, userId) => {
  const result = await pool.query(
    'INSERT INTO items (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
    [title, description, userId]
  );
  return result.rows[0];
};

exports.updateItem = async (id, title, description, userId) => {
  const result = await pool.query(
    'UPDATE items SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
    [title, description, id, userId]
  );
  return result.rows[0];
};

exports.deleteItem = async (id, userId) => {
  await pool.query('DELETE FROM items WHERE id = $1 AND user_id = $2', [id, userId]);
};
