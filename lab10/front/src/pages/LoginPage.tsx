import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const schema = z.object({
  email: z.string().email("Некоректний email"),
  password: z.string().min(8, "Пароль має містити мінімум 8 символів"),
});
type FormData = z.infer<typeof schema>;
export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  async function onSubmit(data: FormData) {
    try {
      setServerError("");
      await login(data.email, data.password);
      navigate("/profile");
    } catch {
      setServerError("Невірний email або пароль");
    }
  }

  return (
    <div>
      <h1>Вхід</h1>
      {serverError && <p>{serverError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input placeholder="Email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Пароль"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button disabled={isSubmitting}>
          {isSubmitting ? "Завантаження" : "Увійти"}
        </button>
      </form>

      <p>
        Немає акаунта? <Link to="/register">Реєстрація</Link>
      </p>
    </div>
  );
}
