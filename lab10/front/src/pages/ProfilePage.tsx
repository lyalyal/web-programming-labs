import { useAuth } from "../auth/AuthContext";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Профіль</h1>
      <p>ID: {user?.id}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}
