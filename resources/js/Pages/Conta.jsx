import { useEffect } from "react";
import { LogOut } from "lucide-react";
import { usePage, router } from "@inertiajs/react";

const Conta = () => {
  const { authUser } = usePage().props;

  // Redireciona automaticamente se não estiver autenticado
  useEffect(() => {
    if (!authUser) {
      router.visit("/login/voluntario");
    }
  }, [authUser]);

  if (!authUser) return null;

  const handleLogout = () => {
    router.post("/logout", {}, {
      onSuccess: () => window.location.href = "/",
      onError: () => alert("Erro ao sair. Tente novamente."),
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-[#313A4B] dark:text-white">Minha Conta</h2>

      <div className="space-y-4">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Nome</p>
          <p className="text-lg text-gray-900 dark:text-white font-semibold">
            {authUser.nome || "—"}
          </p>
        </div>

        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Email</p>
          <p className="text-lg text-gray-900 dark:text-white font-semibold">
            {authUser.email || "—"}
          </p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
        type="button"
        aria-label="Sair da conta"
      >
        <LogOut className="w-5 h-5" />
        <span>Sair da conta</span>
      </button>
    </div>
  );
};

export default Conta;
