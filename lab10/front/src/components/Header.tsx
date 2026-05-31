import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header>
      <nav>
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Вийти</button>
          </>
        ) : (
          <>
            <Link to="/login">Увійти</Link>
            <Link to="/register">Зареєструватися</Link>
          </>
        )}
      </nav>
    </header>
  );
}
