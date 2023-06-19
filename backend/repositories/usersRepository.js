const db = require('../db');

class Users {
  async getAll() {
    const { rows } = await db.query('SELECT * FROM users ORDER BY username');
    return rows;
  }

  async getById(id) {
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
  }

  async create(body) {
    const { username, password, } = body;
    const { rows } = await db.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', 
        [username, password, ]);
    return rows[0];
  }

  async updateById(id, body) {
   const { username, password } = body;
    const { rows } = await db.query(
        'UPDATE users SET username = $2, password = $3 WHERE id = $1 RETURNING *',
        [id, username, password]);
    return rows[0];
  }

  async deleteById(id) {
    const { rows } = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }

  async login(body) {
    const {username, password} = body;
    const {rows} = await db.query(
      'SELECT * FROM users WHERE username like $1 AND password LIKE $2', 
      [username, password]);
      return rows[0];
  }
}

module.exports = new Users();
