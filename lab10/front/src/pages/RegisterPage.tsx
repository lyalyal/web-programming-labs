import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const schema = z.object({
  email: z.string().email("Некоректний email"),
  password: z.string().min(8, "Пароль має містити мінімум 8 символів"),
});
type FormData = z.infer<typeof schema>;

export function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
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
      await registerUser(data.email, data.password);
      setMessage("Акаунт успішно створено");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch {
      setServerError("Користувач з таким email вже існує");
    }
  }

  return (
    <div>
      <h1>Реєстрація</h1>
      {message && <p>{message}</p>}
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
          {isSubmitting ? "Завантаження" : "Зареєструватися"}
        </button>
      </form>

      <p>
        Уже є акаунт? <Link to="/login">Увійти</Link>
      </p>
    </div>
  );
}
