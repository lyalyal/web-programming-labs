import { NavLink, Outlet } from "react-router";
import styles from "./Layout.module.css";
//Керування стилями для посилань
export default function Layout() {
  //Перевірка чи є посилання активним
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <span className={styles.logo}>📋 Task Manager</span>
        {/*Посилання на головну сторінку*/}
        <nav className={styles.nav}>
          <NavLink to="/tasks" end className={getLinkClass}>
            Всі задачі
          </NavLink>
          {/*Посилання для переходу на іншу сторінку*/}
          <NavLink to="/tasks/new" className={getLinkClass}>
            Нова задача
          </NavLink>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
