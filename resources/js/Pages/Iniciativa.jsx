import  { useState} from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const initialInitiatives = [
  {
    title: "Orfanatos",
    description: "Texto sobre orfanatos e sua importância.",
  },
  {
    title: "Educação",
    description: "Texto aleatório sobre uma iniciativa linda e transformadora.",
    image: "../Assets/iniciativa2.jpg",
  },
  {
    title: "Saúde",
    description: "Texto aleatório sobre cuidados com a saúde e bem-estar.",
    image: "../Assets/iniciativa3.jpg",
  },
  {
    title: "Meio Ambiente",
    description: "Ações para um futuro mais verde.",
    image: "../Assets/iniciativa4.jpg",
  },
  {
    title: "Comunidade",
    description: "Fortalecendo vínculos e apoio mútuo.",
    image: "../Assets/iniciativa5.jpg",
  },
  {
    title: "Inclusão",
    description: "Promovendo igualdade de oportunidades.",
    image: "../Assets/iniciativa6.jpg",
  },
  {
    title: "Tecnologia",
    description: "Projetos de inovação para o bem comum.",
    image: "../Assets/iniciativa7.jpg",
  },
];

// Card individual
const InitiativeCard = ({ title, description, image, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white break-inside-avoid rounded-lg shadow-md overflow-hidden cursor-pointer relative transition-transform hover:scale-[1.015]"
  >
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
      <div className="p-4 text-white">
        <h3 className="text-xl font-bold mb-1 truncate">{title}</h3>
        <p className="text-sm line-clamp-3">{description}</p>
      </div>
    </div>
  </div>
);

// Modal com animação de sucesso
const Modal = ({
  initiative,
  onClose,
  onConfirmSuccess,
  isRegisterMode = false,
  onSubmit,
  setNewInitiative,
  newInitiative,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onConfirmSuccess(); // Fecha modal e reseta
    }, 3000);
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
    Enviamos a sua solicitação a campanha
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
                setNewInitiative({ ...newInitiative, description: e.target.value })
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
                onClick={handleConfirm}
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
  const [initiatives, setInitiatives] = useState(initialInitiatives);
  const [selected, setSelected] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [newInitiative, setNewInitiative] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleCardClick = (initiative) => setSelected(initiative);
  const handleCloseModal = () => {
    setSelected(null);
    setIsRegisterOpen(false);
  };

  const handleRegister = () => {
    if (newInitiative.title && newInitiative.description && newInitiative.image) {
      setInitiatives([newInitiative, ...initiatives]);
      setNewInitiative({ title: "", description: "", image: "" });
      setIsRegisterOpen(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-zinc-900 bg-gray-50 px-4 pb-8">
      {/* Banner */}
      <div className="pt-4">
        <img
          src="./Assets/banner_clear.png"
          alt="Banner"
          className="w-full h-64 object-cover rounded-2xl shadow-lg"
        />
      </div>

      {/* Cards */}
      <div className="mt-8 columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
        {initiatives.map((initiative, index) => (
          <InitiativeCard
            key={index}
            {...initiative}
            onClick={() => handleCardClick(initiative)}
          />
        ))}
      </div>

      {/* Modal de visualização */}
      {selected && (
        <Modal
          initiative={selected}
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
