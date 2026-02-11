class MediaItem {
  //Поле яке є приватне для підрахунку ID
  static #nextId = 1;
  //Поле для зберігання ID(унікального)
  #id;
  constructor(title, year) {
    //Присвоєння поточного лічильника та збільшення його для наступного предмета
    this.#id = MediaItem.#nextId++;
    this.title = title;
    this.year = year;
  }

  get id() {
    return this.#id;
  }
  get age() {
    return new Date().getFullYear() - this.year;
  }
  //Вивід інформації
  getInfo() {
    return `[${this.#id}] ${this.title} (${this.year})`;
  }
  //Мето для порівняння двох предметів їхнього року
  static compare(a, b) {
    return a.year - b.year;
  }
}
//Клас який наслідує головний клас
class Book extends MediaItem {
  constructor(title, year, author, pages) {
    //Виклик конструктора який написаний зверху(або батьківського класу)
    super(title, year);
    this.author = author;
    this.pages = pages;
  }
  //Метод для виведення даних про  книги
  getInfo() {
    return `[${this.id}] ${this.title} — ${this.author} (${this.year}, стор. ${this.pages})`;
  }
}
//Клас фільмів який також наслідує головний клас
class Movie extends MediaItem {
  constructor(title, year, director, duration) {
    //Виклик конструктора
    super(title, year);
    this.director = director;
    this.duration = duration;
  }
  //Вивід даних по фільму
  getInfo() {
    return `[${this.id}] ${this.title} — ${this.director} (${this.year}, ${this.duration} хв)`;
  }
}

const book1 = new Book("Кобзар", 1840, "Тарас Шевченко", 280);
const book2 = new Book("Clean Code", 2008, "Robert Martin", 464);
const movie1 = new Movie("Тіні забутих предків", 1965, "Сергій Параджанов", 97);

console.log("=== Завдання 3: Класи ===");
console.log("3.1 Вік книги:", book1.age, "років");
console.log("3.2 Інформація про книгу:", book1.getInfo());
console.log("3.3 Інформація про фільм:", movie1.getInfo());
//сортування статичним методом
const items = [book1, book2, movie1];
const sorted = [...items].sort(MediaItem.compare);

console.log(
  "3.1 Відсортовано за роком:",
  sorted.map((i) => i.getInfo()),
);
