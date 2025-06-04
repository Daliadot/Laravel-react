import { useEffect, useState } from "react";

interface FormData {
  nome: string;
  email: string;
  cnpj: string;
  conta: string;
  empresa: string;
  descricao: string;
}

export default function EditarInstituicao() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    cnpj: "",
    conta: "",
    empresa: "",
    descricao: "",
  });

  const [imagens, setImagens] = useState<string[]>([]);

  useEffect(() => {
    const dadosMockados: FormData = {
      nome: "Associação Luz do Amanhã",
      email: "contato@luzdoamanha.org",
      cnpj: "12.345.678/0001-99",
      conta: "123456-7",
      empresa: "Luz do Amanhã",
      descricao:
        "ONG dedicada à educação e alimentação de crianças em situação de vulnerabilidade.",
    };

    const imagensMockadas: string[] = [
      "/assets/iniciativa4.jpg",
      "/assets/iniciativa7.jpg",
    ];

    setFormData(dadosMockados);
    setImagens(imagensMockadas);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as keyof FormData;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagens((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removerImagem = (idxRemover: number) => {
    setImagens((prev) => prev.filter((_, idx) => idx !== idxRemover));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados (mock):", formData, imagens);
    alert("Alterações salvas (simulação)!");
  };

  return (
    <div className="min-h-screen p-6 flex justify-center items-start bg-gray-100 dark:bg-zinc-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 shadow-md rounded-2xl p-8 w-full max-w-2xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center dark:text-white">
          Editar Instituição
        </h2>

        <input
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Nome"
          className="w-full border rounded-lg px-4 py-2"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-2"
        />
        <input
          name="cnpj"
          value={formData.cnpj}
          onChange={handleChange}
          placeholder="CNPJ"
          className="w-full border rounded-lg px-4 py-2"
        />
        <input
          name="conta"
          value={formData.conta}
          onChange={handleChange}
          placeholder="Número da Conta"
          className="w-full border rounded-lg px-4 py-2"
        />
        <input
          name="empresa"
          value={formData.empresa}
          onChange={handleChange}
          placeholder="Nome da Empresa"
          className="w-full border rounded-lg px-4 py-2"
        />
        <textarea
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          rows={4}
          placeholder="Descrição Detalhada"
          className="w-full border rounded-lg px-4 py-2"
        />

        <div>
          <label className="block mb-2 text-sm font-medium dark:text-white">
            Imagens
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <div className="grid grid-cols-3 gap-3 mt-3">
            {imagens.map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={img}
                  alt={`Preview ${idx}`}
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removerImagem(idx)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remover imagem"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
