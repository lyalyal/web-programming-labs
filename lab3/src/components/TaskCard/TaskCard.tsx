/*Імпорт бібліотек*/
import type { Task, TaskStatus } from "../../types/task";
import styles from "./TaskCard.module.css";
import clsx from "clsx";
/*Інтерфейс який отримує дані від батьківського елементу*/
interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}
//Форматування дати
function TaskCard({ task, onDelete, onStatusChange }: TaskCardProps) {
  const formattedDate = task.createdAt.toLocaleDateString("uk-UA");
  //Пріотритети та до них стль до них
  return (
    <div
      className={clsx(
        styles.card,
        task.priority === "low" && styles.cardLow,
        task.priority === "medium" && styles.cardMedium,
        task.priority === "high" && styles.cardHigh,
      )}
    >
      <h3 className={styles.title}>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <div className={styles.meta}>
        <span>Пріоритет: {task.priority}</span>
        <span>Дата: {formattedDate}</span>
      </div>
      {/*Зміна статусу та приведення типу*/}
      <div className={styles.actions}>
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as TaskStatus)
          }
        >
          <option value="todo">Нові</option>
          <option value="in-progress">В роботі</option>
          <option value="done">Виконані</option>
        </select>
        {/*Кнопка видалити*/}
        <button onClick={() => onDelete(task.id)}>Видалити</button>
      </div>
    </div>
  );
}

export default TaskCard;
