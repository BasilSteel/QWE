const express = require('express');
const app = express();
const port = 3000;

// Статичные данные
const статичныеДанные = {
  сообщение: 'Привет, мир!',
  числа: [1, 2, 3, 4, 5],
  пользователь: {
    имя: 'John Doe',
    возраст: 30,
    email: 'john@example.com'
  }
};

// Обработчик маршрута для возврата JSON
app.get('/api/статичныеДанные', (req, res) => {
  res.json(статичныеДанные);
});

// Слушаем порт
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
