//Імпорт файлі, класів та методів
import { LIBRARY_NAME, books } from "./data.js";
import BookCollection from "./untils.js";
import {
  getBooksByGenre as filterByGenre,
  getAveragePages,
  getOldestBook,
} from "./untils.js";

console.log("=== Завдання 5: Модулі ===");

//Вивід назви бібліотеки, жанру книги та кількості сторінок середня
console.log("5.1 Бібліотека:", LIBRARY_NAME);
console.log("5.1 Книги жанру фентезі:", filterByGenre(books, "фентезі"));
console.log(
  "5.1 Середня кількість сторінок:",
  getAveragePages(books).toFixed(2),
);
console.log("5.1 Найстаріша книга:", getOldestBook(books).title);
//Клас на основі  масиву книг
const collection = new BookCollection(books);
console.log("5.2 Кількість книг у колекції:", collection.count);
console.log(
  "5.2 Відсортовано за роком:",
  collection.getSortedByYear().map((b) => b.title),
);
//Додавання нової книги через метод нового обєкту
collection.addBook({
  title: "Щось",
  author: "Хтось",
  year: 2024,
  pages: 1000,
  genre: "детектив",
});
//Вивід нової інформації про кількість книг
console.log("5.3 Кількість після додавання:", collection.count);
