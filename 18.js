const express = require('express');
const app = express();
const port = 3000;

// Middleware для всегда отправки ошибки 404
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// Слушаем порт
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
