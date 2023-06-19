const db = require('../db');

class Articles {
  async getAll() {
    const { rows } = await db.query('SELECT * FROM articles ORDER BY title');
    return rows;
  }

  async getById(id) {
    const { rows } = await db.query('SELECT * FROM articles WHERE id = $1', [id]);
    return rows[0];
  }

  async create(body) {
    const { title, content, author_id } = body;
    const { rows } = await db.query(
        'INSERT INTO articles (title, content, author_id) VALUES ($1, $2, $3 ) RETURNING *', 
        [title, content, author_id]);
    return rows[0];
  }

  async updateById(id, body) {
   const { title, content } = body;
    const { rows } = await db.query(
        'UPDATE articles SET title = $2, content = $3 WHERE id = $1 RETURNING *',
        [id, title, content,]);
    return rows[0];
  }

  async deleteById(id) {
    const { rows } = await db.query('DELETE FROM articles WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }
}

module.exports = new Articles();
