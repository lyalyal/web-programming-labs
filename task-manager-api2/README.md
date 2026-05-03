Лабораторна робота №8
Тема: Інтеграція бази даних у Nest.js застосунок

## Запуск проєкту

1. Встановити залежності:

```bash
npm install

Створити файл .env:
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=lab8

Створити базу даних у PostgreSQL:
CREATE DATABASE lab8;

Виконати міграції:
npm run migration:generate
npm run migration:run

Запустити сервер:
npm run start:dev

Змінні середовища
| Змінна      | Опис                 |
| ----------- | -------------------- |
| PORT        | Порт запуску сервера |
| DB_HOST     | Хост бази даних      |
| DB_PORT     | Порт PostgreSQL      |
| DB_USERNAME | Користувач БД        |
| DB_PASSWORD | Пароль БД            |
| DB_DATABASE | Назва бази даних     |


Ендпоінти
Tasks
| Метод  | URL           | Опис                |
| ------ | ------------- | ------------------- |
| GET    | /tasks        | Отримати всі задачі |
| GET    | /tasks/:id    | Отримати задачу     |
| GET    | /tasks/search | Пошук за статусом   |
| POST   | /tasks        | Створити задачу     |
| PATCH  | /tasks/:id    | Оновити задачу      |
| DELETE | /tasks/:id    | Видалити задачу     |

Tags
| Метод  | URL       | Опис              |
| ------ | --------- | ----------------- |
| GET    | /tags     | Отримати всі теги |
| POST   | /tags     | Створити тег      |
| PATCH  | /tags/:id | Оновити тег       |
| DELETE | /tags/:id | Видалити тег      |

```
