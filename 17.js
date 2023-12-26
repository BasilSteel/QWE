const express = require('express');
const sqlite3 = require('sqlite3');
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

// Обработчик маршрута для возврата списка пользователей
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

// Слушаем порт
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
