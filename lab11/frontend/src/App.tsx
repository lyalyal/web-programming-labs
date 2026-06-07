import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
type UploadedFile = {
  name: string;
  originalName: string;
  size: number;
  mimetype: string;
  url: string;
};
const API_URL = import.meta.env.VITE_API_URL;
const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
function App() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  const validateFile = (selectedFile: File): string => {
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      return "Дозволено завантажувати лише JPEG, PNG або WEBP зображення.";
    }
    if (selectedFile.size > MAX_SIZE) {
      return "Розмір файлу не повинен перевищувати 5 МБ.";
    }
    return "";
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setMessage("");
    setProgress(0);
    setUploadedFile(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const error = validateFile(selectedFile);

    if (error) {
      setMessage(error);
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Спочатку оберіть файл.");
      return;
    }

    const error = validateFile(file);

    if (error) {
      setMessage(error);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");
      setProgress(0);

      const response = await axios.post<UploadedFile>(
        `${API_URL}/files`,
        formData,
        {
          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round((event.loaded * 100) / event.total);
              setProgress(percent);
            }
          },
        },
      );

      setUploadedFile(response.data);
      setMessage("Файл успішно завантажено.");
    } catch (error: any) {
      const serverMessage =
        error.response?.data?.message || "Помилка під час завантаження файлу.";
      setMessage(
        Array.isArray(serverMessage) ? serverMessage.join(", ") : serverMessage,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Завантаження зображень</h1>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
        />

        {file && (
          <div className="info">
            <p>
              <b>Назва:</b> {file.name}
            </p>
            <p>
              <b>Розмір:</b> {(file.size / 1024 / 1024).toFixed(2)} МБ
            </p>
          </div>
        )}

        {previewUrl && (
          <div>
            <h3>Попередній перегляд</h3>
            <img src={previewUrl} alt="preview" className="image" />
          </div>
        )}

        <button onClick={handleUpload} disabled={!file || loading}>
          {loading ? "Завантаження..." : "Завантажити"}
        </button>

        {loading && (
          <div className="progress-wrapper">
            <div className="progress-bar" style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>
        )}

        {message && <p className="message">{message}</p>}

        {uploadedFile && (
          <div>
            <h3>Файл із сервера</h3>
            <img
              src={uploadedFile.url}
              alt={uploadedFile.originalName}
              className="image"
            />
            <p>
              <b>URL:</b> {uploadedFile.url}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
