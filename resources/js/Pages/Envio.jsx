import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect } from "react";
import { router } from "@inertiajs/react";

const PerfilEnviadoSucesso = () => {
  useEffect(() => {
    // Redireciona automaticamente após alguns segundos (opcional)
    const timeout = setTimeout(() => {
      router.visit("/perfil");
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 rounded-xl shadow-xl p-8 flex flex-col items-center text-center">
        <DotLottieReact
          src="https://lottie.host/1744fdb6-3af1-4284-b661-cd9a1d455738/UVRVaY59jR.lottie"
          autoplay
          loop={false}
          style={{ height: 180 }}
        />
        <h1 className="text-2xl font-bold text-green-600 mt-6">Perfil enviado com sucesso!</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Sua solicitação foi registrada. Em breve você receberá uma resposta.
        </p>
        <button
          onClick={() => router.visit("/perfil")}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold transition"
        >
          Voltar ao perfil
        </button>
      </div>
    </div>
  );
};

export default PerfilEnviadoSucesso;
