const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Инициализация базы данных SQLite
const db = new sqlite3.Database('./users.db');

// Создание таблицы "Пользователи" (если не существует)
db.run(`
  CREATE TABLE IF NOT EXISTS Пользователи (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    имя TEXT NOT NULL,
    возраст INTEGER
  )
`);

// Middleware для обработки тела запроса в формате JSON
app.use(bodyParser.json());

// Обработчик GET-запроса для возврата списка пользователей
app.get('/api/пользователи', (req, res) => {
  // Запрос к базе данных
  db.all('SELECT * FROM Пользователи', (err, результат) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Ошибка сервера' });
    } else {
      res.json(результат);
    }
  });
});

// Обработчик POST-запроса для добавления нового пользователя
app.post('/api/пользователи', (req, res) => {
  const { имя, возраст } = req.body;

  // Валидация данных
  if (!имя || !возраст) {
    return res.status(400).json({ error: 'Необходимо указать имя и возраст пользователя' });
  }

  // Вставка нового пользователя в базу данных
  db.run('INSERT INTO Пользователи (имя, возраст) VALUES (?, ?)', [имя, возраст], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Ошибка сервера' });
    } else {
      res.json({ id: this.lastID, имя, возраст });
    }
  });
});

// Слушаем порт
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
