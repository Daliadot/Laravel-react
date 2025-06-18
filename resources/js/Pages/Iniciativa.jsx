import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Inertia } from '@inertiajs/inertia';

// Card individual
const CardInstituicao = ({ instituicao, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white break-inside-avoid rounded-lg shadow-md overflow-hidden cursor-pointer relative transition-transform hover:scale-[1.015]"
  >
    <div className="relative w-full h-48">
      <img
        src={instituicao.imagem}
        alt={instituicao.nome}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
      <h3 className="absolute bottom-2 left-2 right-2 text-white text-xl font-bold truncate">
        {instituicao.nome}
      </h3>
    </div>
  </div>
);

// Modal
const Modal = ({
  initiative,
  onClose,
  onConfirmSuccess,
  isRegisterMode,
  newInitiative,
  setNewInitiative,
  onSubmit,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onConfirmSuccess(); // fecha o modal depois de 3s
    }, 3000);
  };

 const handleEnviarPerfil = () => {
 
  handleConfirm(); 
};

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-zinc-800 w-full max-w-4xl p-6 rounded-xl shadow-lg text-black dark:text-[#d4d4d4] flex flex-col gap-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 text-2xl"
        >
          &times;
        </button>

        {showSuccess ? (
          <div className="flex flex-col items-center justify-center py-12">
            <DotLottieReact
              src="https://lottie.host/1744fdb6-3af1-4284-b661-cd9a1d455738/UVRVaY59jR.lottie"
              autoplay
              loop={false}
              style={{ height: 200 }}
            />
            <p className="mt-4 text-lg font-semibold text-green-600">
              Enviamos a sua solicitação à campanha
            </p>
          </div>
        ) : isRegisterMode ? (
          <>
            <h2 className="text-2xl font-bold">Cadastrar Iniciativa</h2>
            <input
              type="text"
              placeholder="Título"
              value={newInitiative.title}
              onChange={(e) =>
                setNewInitiative({ ...newInitiative, title: e.target.value })
              }
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-700 text-black dark:text-white p-2 rounded w-full"
            />
            <textarea
              placeholder="Descrição"
              value={newInitiative.description}
              onChange={(e) =>
                setNewInitiative({
                  ...newInitiative,
                  description: e.target.value,
                })
              }
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-700 text-black dark:text-white p-2 rounded w-full"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewInitiative({
                  ...newInitiative,
                  image: URL.createObjectURL(e.target.files[0]),
                })
              }
              className="dark:text-white"
            />
            <button
              onClick={onSubmit}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded self-start"
            >
              Salvar Iniciativa
            </button>
          </>
        ) : (
          <div className="flex gap-6">
            <img
              src={initiative.image}
              alt={initiative.title}
              className="w-1/2 h-auto rounded-lg object-cover"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4">{initiative.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                  {initiative.description}
                </p>
              </div>
              <button
                onClick={handleEnviarPerfil}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
              >
                Enviar perfil
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente principal
const Iniciativas = () => {
  const [instituicoes, setInstituicoes] = useState([]);
  const [selecionada, setSelecionada] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [newInitiative, setNewInitiative] = useState({
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/api/Instituicao", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((dados) => {
        const aprovadas = dados.filter((item) => item.status === "aceito");
        setInstituicoes(aprovadas);
      })
      .catch((erro) =>
        console.error("Erro ao buscar instituições:", erro)
      );
  }, []);

  const handleCardClick = (instituicao) => {
    setSelecionada({
      title: instituicao.nome,
      description: instituicao.descricao,
      image: instituicao.imagem,
    });
  };

  const handleCloseModal = () => {
    setSelecionada(null);
    setIsRegisterOpen(false);
  };

  const handleRegister = () => {
    console.log("Cadastrar iniciativa:", newInitiative);
    setIsRegisterOpen(false);
    setNewInitiative({ title: "", description: "", image: null });
  };

  const urlImagem = "https://i.postimg.cc/65NVgn6n/banner-clear.png";

  return (
    <div className="min-h-screen dark:bg-zinc-900 bg-gray-50 px-4 pb-8">
      <div className="pt-4">
        <img
          src={urlImagem}
          alt="Banner"
          className="w-full h-64 object-cover rounded-2xl shadow-lg"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {instituicoes.map((item) => (
          <CardInstituicao
            key={item.id}
            instituicao={item}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </div>

      {/* Modal de visualização */}
      {selecionada && (
        <Modal
          initiative={selecionada}
          onClose={handleCloseModal}
          onConfirmSuccess={handleCloseModal}
        />
      )}

      {/* Modal de cadastro */}
      {isRegisterOpen && (
        <Modal
          isRegisterMode
          onClose={handleCloseModal}
          onSubmit={handleRegister}
          newInitiative={newInitiative}
          setNewInitiative={setNewInitiative}
        />
      )}
    </div>
  );
};

export default Iniciativas;
