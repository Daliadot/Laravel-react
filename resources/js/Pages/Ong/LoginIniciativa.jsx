import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "/login/instituicao",
        { email, password },
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
          },
          withCredentials: true, // importante para enviar e receber cookies da sessão
        }
      );

      // Redireciona para o dashboard da instituição
      window.location.href = "/perfil";
    } catch (error) {
      console.error(error);
      alert("Erro no login. Verifique seu e-mail e senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-zinc-800 bg-gray-100 p-4">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center dark:text-[#7a7a7a] text-gray-800">Login Instituição</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <Input label="Email" value={email} onChange={setEmail} type="email" />
          <Input label="Senha" value={password} onChange={setPassword} type="password" />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 dark:bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

// Componente reutilizável de input
function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block mb-1 dark:text-[#7a7a7a] font-medium">{label}</label>
      <input
        type={type}
        className="w-full border rounded-lg px-4 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
      />
    </div>
  );
}
