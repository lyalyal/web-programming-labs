import { VARIANT } from "./config.js";

const products = [
  {
    id: 1,
    name: "Ноутбук",
    price: 25000 + VARIANT * 100,
    category: "electronics",
    inStock: true,
  },
  {
    id: 2,
    name: "Навушники",
    price: 2500 + VARIANT * 10,
    category: "electronics",
    inStock: true,
  },
  {
    id: 3,
    name: "Футболка",
    price: 800 + VARIANT * 5,
    category: "clothing",
    inStock: false,
  },
  {
    id: 4,
    name: "Книга 'JavaScript'",
    price: 450 + VARIANT * 3,
    category: "books",
    inStock: true,
  },
  {
    id: 5,
    name: "Рюкзак",
    price: 1500 + VARIANT * 8,
    category: "accessories",
    inStock: true,
  },
  {
    id: 6,
    name: "Клавіатура",
    price: 3200 + VARIANT * 15,
    category: "electronics",
    inStock: false,
  },
  {
    id: 7,
    name: "Кросівки",
    price: 4200 + VARIANT * 20,
    category: "clothing",
    inStock: true,
  },
  {
    id: 8,
    name: "Книга 'TypeScript'",
    price: 520 + VARIANT * 4,
    category: "books",
    inStock: true,
  },
  {
    id: 9,
    name: "Чохол для телефону",
    price: 350 + VARIANT * 2,
    category: "accessories",
    inStock: true,
  },
  {
    id: 10,
    name: "Монітор",
    price: 12000 + VARIANT * 50,
    category: "electronics",
    inStock: true,
  },
];

//Вивід предметів які є в наявності
function getAvailableProducts(products) {
  return (
    products
      //Залишок предмітів які є у  наявності
      .filter((product) => product.inStock)
      //Вивід масиву тільки із предметів які є у наявності
      .map((product) => product.name)
  );
}

//Фільтрація та сортування предметів
function getProductsByCategory(products, category) {
  return (
    products
      .filter((product) => product.category === category)
      //Порівняння цін для сортування
      .sort((a, b) => a.price - b.price)
  );
}

//Розрахунок загальної ціни предметів які є у наявності
function getTotalPrice(products) {
  return (
    products
      //Предмети яких нема у наявності нерахуються
      .filter((product) => product.inStock)
      //Розрахунок загальної ціни
      .reduce((total, product) => total + product.price, 0)
  );
}

//  Створення звіту для предметів
function getProductsSummary(products) {
  return products.reduce((summary, product) => {
    const { category, price } = product;
    //Створення категорії з нуля якщо її немає у списку
    if (!summary[category]) {
      summary[category] = { count: 0, totalPrice: 0 };
    }
    //Додавання одиницю предмету та ціну для загальної суми всіх предметів
    summary[category].count += 1;
    summary[category].totalPrice += price;

    return summary;
  }, {});
}

console.log("=== Завдання 2: Методи масивів ===");
console.log("Варіант:", VARIANT);
console.log("2.1:", getAvailableProducts(products));
console.log("2.2:", getProductsByCategory(products, "electronics"));
console.log("2.3:", getTotalPrice(products));
console.log("2.4:", getProductsSummary(products));
