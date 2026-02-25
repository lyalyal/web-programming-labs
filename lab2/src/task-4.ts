export {};

abstract class BaseNotifier {
  constructor(protected readonly name: string) {}

  // Абстрактний метод — нащадки зобов'язані реалізувати
  abstract send(to: string, subject: string, body: string): void;

  // Шаблонний метод — спільна логіка для всіх нащадків
  notify(to: string, subject: string, body: string): void {
    console.log(`[${this.name}] Надсилання сповіщення...`);
    this.send(to, subject, body);
    console.log(`[${this.name}] Сповіщення надіслано`);
  }
}
//Сповіщення через електрону пошту
class EmailNotifier extends BaseNotifier {
  constructor(private readonly smtpServer: string) {
    super("Email");
  }
  //Відправка пошти
  send(to: string, subject: string, body: string): void {
    //Обмеження довжини тексту до 50 символів
    const shortBody = body.slice(0, 50);
    console.log(
      `Email → ${to}: "${subject}" | Тіло: ${shortBody} через ${this.smtpServer}`,
    );
  }
}
//Реалізація повідомлень
class SmsNotifier extends BaseNotifier {
  //Початкові цифри номера телефона
  constructor(private readonly phonePrefix: string = "+380") {
    super("SMS");
  }
  //Відправка повідомлення
  send(to: string, subject: string, body: string): void {
    //Розмір повідомлення
    const shortBody = body.slice(0, 160);
    console.log(` SMS → ${this.phonePrefix}${to}: "${shortBody}"`);
  }
}
//Масова відправка
function sendBulkNotification(
  notifiers: BaseNotifier[],
  to: string,
  subject: string,
  body: string,
): void {
  for (const notifier of notifiers) {
    notifier.notify(to, subject, body);
  }
}

console.log("=== Завдання 4: Наслідування та поліморфізм ===");
//Різні канали сповіщень
const notifiers: BaseNotifier[] = [
  new EmailNotifier("smtp.gmail.com"),
  new SmsNotifier(),
];
//Віправлення повідомлення про проєкт
sendBulkNotification(
  notifiers,
  "user@example.com",
  "Нова задача призначена",
  "Вам призначено задачу 'Розробити API' з пріоритетом high. Дедлайн: 01.02.2025",
);
