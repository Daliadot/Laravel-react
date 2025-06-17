import { Mail, Lock, LogOut, User as UsuariosIcon } from "lucide-react";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

const Conta = () => {
  const { authUser } = usePage().props;

  useEffect(() => {
    if (!authUser) {
      window.location.href = "/login/voluntario"; // rota para login, ajuste se precisar
    }
  }, [authUser]);

  if (!authUser) return null;

 const handleLogout = async () => {
  try {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
    console.log("Token CSRF no logout:", token);

    const response = await fetch("/logout", {
  method: "POST",
  headers: {
    "X-CSRF-TOKEN": token || "",
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "application/json",
  },
  credentials: "same-origin", 
});

    if (response.ok) {
      window.location.href = "/perfil";
    } else {
      const errorData = await response.json();
      console.error("Erro ao sair:", errorData);
      alert("Erro ao sair. Tente novamente.");
    }
  } catch (error) {
    alert("Erro de rede ao tentar sair.");
    console.error(error);
  }
};

  // Log só uma vez, sem duplicação
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
  console.log("Token CSRF capturado:", token);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 rounded-xl space-y-6 shadow-xl">
      <h2 className="text-2xl font-bold text-[#313A4B] dark:text-white">Minha Conta</h2>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <UsuariosIcon className="text-sky-800" />
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-300">Nome</p>
            <p className="text-base font-medium text-neutral-700 dark:text-white">{authUser.nome}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Mail className="text-sky-800" />
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-300">Email</p>
            <p className="text-base font-medium text-neutral-700 dark:text-white">{authUser.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Lock className="text-sky-800" />
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-300">Tipo de Conta</p>
            <p className="text-base font-medium text-neutral-700 dark:text-white capitalize">{authUser.tipo}</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full flex items-center justify-center space-x-2 bg-sky-700 hover:bg-sky-850 text-white py-2 px-4 rounded-lg transition"
      >
        <LogOut className="w-5 h-5" />
        <span>Sair da conta</span>
      </button>
    </div>
  );
};

export default Conta;
