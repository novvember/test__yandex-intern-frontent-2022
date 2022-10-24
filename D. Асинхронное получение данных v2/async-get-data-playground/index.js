const solution = require('./solution.js');

/**
 * Для тестирования вам доступны 4 урла.
 * - "metrika.ru/api/analitics" - всегда отвечает верными данными.
 * - "google.ru/api/analitics" - первые 2 запроса возвращaют битые данные с неверным хешом.
 * - "boston-dynamics.com/api/analitics" - первые 3 запроса падают с ошибками сети.
 * - "badhost-analitics.com/api/analitics" - Сервер постоянно не доступен.
 *
 * Меняя параметр retryCount и набор урлов, вы можете сэмулировать все возможные варианты работы системы.
 */
solution(
  [
    'metrika.ru/api/analitics',
    'badhost-analitics.com/api/analitics',
    'google.ru/api/analitics',
    'boston-dynamics.com/api/analitics',
  ],
  4,
)
  .then(console.log)
  .catch(console.error);
