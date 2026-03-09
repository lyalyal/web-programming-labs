import type { Task, TaskStatus } from "../../types/task";
import TaskCard from "../TaskCard/TaskCard";
import styles from "./TaskList.module.css";
//Список задач та обробник подій
interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}
/*Якщо задач немає то виводиться повідомлення про це*/
function TaskList({ tasks, onDelete, onStatusChange }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className={styles.empty}>Нічого немає. Додайте хоч якусь задачу</p>
    );
  }

  return (
    <div className={styles.list}>
      {/*Масив задач для створення списку */}
      {tasks.map((task) => (
        <TaskCard
          //Індефікатор атрибутів за айди
          key={task.id}
          task={task}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskList;
