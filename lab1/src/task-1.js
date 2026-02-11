console.log("=== Завдання 1: Деструктуризація та Spread/Rest ===");
//Функція для створення повного ФІО
function getFullName(user) {
  //По батькові за замовчуванням порожнє
  const { firstName, lastName, middleName = "" } = user;
  //Формування виводу прізвища та імені
  let result = `${lastName} ${firstName[0]}.`;
  //Є по батькові значить вивід і по батькові
  if (middleName) {
    result += ` ${middleName[0]}.`;
  }
  return result;
}
const user1 = {
  firstName: "Петро",
  lastName: "Іванов",
  middleName: "Сергійович",
};
console.log("1.1 (user1):", getFullName(user1));
//getFullName(user1); // "Іванов П. С."
const user2 = { firstName: "Анна", lastName: "Коваль" };
console.log("1.1 (user2):", getFullName(user2));
//getFullName(user2); // "Коваль А."

console.log("1.2:", mergeObjects({ a: 1 }, { b: 2 }, { a: 3, c: 4 }));
function mergeObjects(...objects) {
  //Використання speread для того щоб розгорнути обєкти і згорнути в новий
  return Object.assign({}, ...objects);
}

console.log("1.3:", removeDuplicates([1, 2, 3], [2, 3, 4], [4, 5])); // [1, 2, 3, 4, 5])
//Обєднання масиву без повторень
function removeDuplicates(...arrays) {
  //Комбінуємо всі цифри в один масив
  const comby = [].concat(...arrays);
  //Через Set залишаємо тільки ті які не повторюються
  return [...new Set(comby)];
}
//Створення нового обєкту
function createUpdatedUser(user, updates) {
  //Копіювання всю інфо, зо була у користувача все інше оновлюємо
  return {
    ...user,
    ...updates,
    //Додавання нових полів для адреси
    address: {
      ...user.address,
      ...updates.address,
    },
  };
}
const user = { name: "John", age: 25, address: { city: "Kyiv", zip: "01001" } };
const updated = createUpdatedUser(user, { age: 26, address: { zip: "02002" } });
console.log("1.4  New:", updated);
console.log("1.4 Old:", user);
