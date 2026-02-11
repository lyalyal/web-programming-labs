//Фільтрація книг за заданим жанром у файлі index
export function getBooksByGenre(books, genre) {
  return books.filter((book) => book.genre === genre);
}
//Функція яка розраховує середню кількість сторінок які є у списку книг
//Якщо коротко то середнє значення за всіма книгами
export function getAveragePages(books) {
  const total = books.reduce((sum, book) => sum + book.pages, 0);
  return books.length ? total / books.length : 0;
}
//Пошук книги у якої самий давній випуск
export function getOldestBook(books) {
  //Порівняння кожної книги із тої яка сама давня, потім вибір той самої книги яка сама давня та вивід її
  return books.reduce((oldest, book) =>
    book.year < oldest.year ? book : oldest,
  );
}
//Клас для управління колекцією із книг
export default class BookCollection {
  constructor(books) {
    //Копія масив для зберігання орігінальних даних
    this.books = [...books];
  }
  //Сортування книг від найдавнішої до новішої
  getSortedByYear() {
    //Щоб сорт не змінив порядок у основному списку, тому тут йде застосування spread
    return [...this.books].sort((a, b) => a.year - b.year);
  }
  //Додавання нової книги
  addBook(book) {
    this.books.push(book);
  }
  //Гетер для повернення кількості книг у списку
  get count() {
    return this.books.length;
  }
}
