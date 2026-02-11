// Функція за допомогу якої створюється пауза невелика
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Функція із імітацією реально запиту на сервер із рандомним результатом
function simulateFetch(url) {
  return new Promise((resolve, reject) => {
    //Генерація випадкового часу для самої відповіді
    const randomDelay = 200 + Math.floor(Math.random() * 301);
    setTimeout(() => {
      //Перевірка безопасності посилання
      if (!url.startsWith("https")) {
        reject(new Error(`Invalid URL: ${url}`));
        return;
      }
      //Імітація стабільності мережі
      const success = Math.random() < 0.7;

      if (success) {
        //Повернення обєкту якщо все вийшло
        resolve({ url, status: 200, data: "OK" });
      } else {
        //Якщо все погано то вивід помилки
        reject(new Error("Server error: 500"));
      }
    }, randomDelay);
  });
}

// Функція для повторного завантаження сервера якщо є збій
async function fetchWithRetry(url, attempts) {
  let lastError;
  for (let i = 1; i <= attempts; i++) {
    //Спочатку якщо запит успішний вивід функції з результатом
    try {
      console.log(`4.3 Спроба №${i}`);
      const result = await simulateFetch(url);
      return result;
      //Якщо результат поганий то вивід помилки
    } catch (error) {
      lastError = error;
      if (i < attempts) {
        await delay(500);
      }
    }
  }
  //Спроб вже немає то вивід останньої помилки
  throw lastError;
}

//Функція завантаження одночасно даних із масиву посилань
async function fetchMultiple(urls) {
  const results = await Promise.allSettled(
    urls.map((url) => simulateFetch(url)),
  );

  const successful = [];
  const failed = [];
  //Розподілення результатів на два окремих масиви
  results.forEach((result) => {
    //Якщо все ок то додаються дані про успішний запит якщо ні то виводиться текст про помилку
    if (result.status === "fulfilled") {
      successful.push(result.value);
    } else {
      failed.push(result.reason.message);
    }
  });
  return { successful, failed };
}

//Функція якап буде демонструвати всі частини роботи
async function main() {
  console.log("=== Завдання 4: async/await ===");

  //Вимірювання реального часу затримку для завдання 4.1
  console.time("4.1 delay");
  await delay(1000);
  console.timeEnd("4.1 delay");

  //Одиночний запит на успіх або помилку
  try {
    const result = await simulateFetch(
      "https://jsonplaceholder.typicode.com/posts",
    );
    console.log("4.2 Успіх:", result);
  } catch (error) {
    console.log("4.2 Очікувана помилка:", error.message);
  }

  //Запит із пятьма спробами при невдачах
  try {
    const result = await fetchWithRetry(
      "https://jsonplaceholder.typicode.com/posts",
      5,
    );
    console.log("4.3 fetchWithRetry результат:", result);
  } catch (error) {
    console.log("4.3 Всі спроби невдалі:", error.message);
  }

  // Паралельне завантаження також при протоколі
  const results = await fetchMultiple([
    "https://jsonplaceholder.typicode.com/posts",
    "http://invalid-url",
    "https://jsonplaceholder.typicode.com/users",
  ]);

  console.log("4.4 Результати:", results);
}

main();
