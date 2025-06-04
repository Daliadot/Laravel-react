import { useState } from "react";
import { router } from "@inertiajs/react";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    router.post("/login/admin", {
      email,
      password,
    }, {
      onSuccess: () => {
        window.location.href = "/admin/dashboard";
      },
      onError: (errors) => {
        setError(errors.email || errors.password || "Credenciais inválidas.");
      },
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="lg:mx-auto lg:w-full lg:max-w-sm">
        <img
          alt="Care.ly"
          src="https://i.postimg.cc/NjVmBH7g/Dark-left-logo.png"
          className="mx-auto h-20 rounded-lg w-auto"
        />
        <h2 className="mt-10 dark:text-sky-900 text-center text-2xl font-bold tracking-tight text-gray-900">
          Entre na sua conta de admin...
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Digite seu email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md px-3 py-1.5 text-base"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="block w-full rounded-md px-3 py-1.5 text-base"
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md"
          >
            Logue-se
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Não é admin?{" "}
          <a
            href="https://forms.gle/fBq5DidVhCL5jQV46"
            className="text-indigo-600 hover:underline"
          >
            Solicite suas credenciais com nossa equipe!
          </a>
        </p>
      </div>
    </div>
  );
}
