export {};

type Status = "todo" | "in_progress" | "done" | "cancelled";
type Priority = "low" | "medium" | "high" | "critical";

interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string | null;
  createdAt: Date;
  dueDate: Date | null;
}
//Різні стани завантаждення даниз від простого завантеження до помилки
type LoadingState = { status: "loading" };
type SuccessState<T> = { status: "success"; data: T; loadedAt: Date };
type ErrorState = { status: "error"; message: string; code: number };
//Обєднання усіх трьох в один тип
type FetchState<T> = LoadingState | SuccessState<T> | ErrorState;
//Перевірка на завантаження
function isLoadingState(state: FetchState<unknown>): state is LoadingState {
  return state.status === "loading";
}
//Перевірка на успішність завантаження
function isSuccessState<T>(state: FetchState<T>): state is SuccessState<T> {
  return state.status === "success";
}
//Перевірка на помилку у завантаженні
function isErrorState(state: FetchState<unknown>): state is ErrorState {
  return state.status === "error";
}

//Функція для стану
function renderState<T>(
  state: FetchState<T>,
  renderData: (data: T) => string,
): string {
  if (isLoadingState(state)) {
    return " Завантаження...";
  }

  if (isSuccessState(state)) {
    return ` Завантажено о ${state.loadedAt.toLocaleTimeString()}: ${renderData(
      state.data,
    )}`;
  }

  if (isErrorState(state)) {
    return ` Помилка ${state.code}: ${state.message}`;
  }

  return "";
}

//Обробка базових типів
function processValue(
  value: string | number | boolean | null | undefined,
): string {
  //Обробка даних при порожніх полів
  if (value === null || value === undefined) {
    return "порожнє значення";
  }
  //Звіження рядка
  if (typeof value === "string") {
    return `Рядок: '${value}' (${value.length} символів)`;
  }
  //Перевірка на парність числа
  if (typeof value === "number") {
    return `Число: ${value} (${value % 2 === 0 ? "парне" : "непарне"})`;
  }
  //Перевірка на булеве значення якщо все правдо то вивід так
  if (typeof value === "boolean") {
    return `Булеве: ${value ? "так" : "ні"}`;
  }

  return "";
}

//Обробка всіх можливих статусів
function getStatusLabel(status: Status): string {
  switch (status) {
    case "todo":
      return "До виконання";
    case "in_progress":
      return "В процесі";
    case "done":
      return "Виконано";
    case "cancelled":
      return "Скасовано";
    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}

console.log("=== Завдання 5: Type Guards та звуження типів ===");
//Стани завантаження
const states: FetchState<Task[]>[] = [
  { status: "loading" },
  { status: "success", data: [], loadedAt: new Date() },
  { status: "error", message: "Not found", code: 404 },
];

states.forEach((state) => {
  console.log(renderState(state, (tasks) => `${tasks.length} задач`));
});

const values: (string | number | boolean | null | undefined)[] = [
  "TypeScript",
  42,
  true,
  null,
  undefined,
  0,
  "",
];

values.forEach((v) => console.log(processValue(v)));
