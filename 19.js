const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware для обработки тела запроса в формате JSON
app.use(bodyParser.json());

// Обработчик POST-запроса
app.post('/api/отправить', (req, res) => {
  // Отправляем обратно то, что пришло от клиента
  res.json({ полученные_данные: req.body });
});

// Слушаем порт
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
