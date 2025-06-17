import { Mail, Lock, LogOut, User as UsuariosIcon, Phone } from "lucide-react";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Conta = () => {
  const { authUser } = usePage().props;

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    cnpj: "",
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    telefone: "",
    descricao: "",
    imagem: null, // base64 ou arquivo
  });

  const [editMode, setEditMode] = useState(false);
  const [previewImagem, setPreviewImagem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authUser) {
      window.location.href = "/login/voluntario"; // ajuste se precisar
      return;
    }
    setFormData({
      nome: authUser.nome || "",
      email: authUser.email || "",
      password: "", // nunca mostrar senha
      cnpj: authUser.cnpj || "",
      cep: authUser.cep || "",
      rua: authUser.rua || "",
      numero: authUser.numero || "",
      bairro: authUser.bairro || "",
      cidade: authUser.cidade || "",
      telefone: authUser.telefone || "",
      descricao: authUser.descricao || "",
      imagem: authUser.imagem || null,
    });
    setPreviewImagem(authUser.imagem || null);
  }, [authUser]);

  if (!authUser) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }

  // Imagem upload e preview (base64)
  function handleImagemChange(e) {
    const file = e.target.files[0];
    if (file) {
      // Para preview e envio, converte para base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImagem(reader.result);
        setFormData((f) => ({ ...f, imagem: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }

  function cancelarEdicao() {
    setFormData({
      nome: authUser.nome || "",
      email: authUser.email || "",
      password: "",
      cnpj: authUser.cnpj || "",
      cep: authUser.cep || "",
      rua: authUser.rua || "",
      numero: authUser.numero || "",
      bairro: authUser.bairro || "",
      cidade: authUser.cidade || "",
      telefone: authUser.telefone || "",
      descricao: authUser.descricao || "",
      imagem: authUser.imagem || null,
    });
    setPreviewImagem(authUser.imagem || null);
    setEditMode(false);
  }

  async function salvarAtualizacao() {
    setLoading(true);

    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

      // Monta payload para enviar
      const payload = {
        nome: formData.nome,
        email: formData.email,
        cnpj: formData.cnpj,
        cep: formData.cep,
        rua: formData.rua,
        numero: formData.numero,
        bairro: formData.bairro,
        cidade: formData.cidade,
        telefone: formData.telefone,
        descricao: formData.descricao,
        imagem: formData.imagem || null,
      };

      // Só envia a senha se tiver sido preenchida (alterada)
      if (formData.password && formData.password.trim() !== "") {
        payload.password = formData.password;
      }

      const response = await fetch("/api/instituicao/atualizar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token || "",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Dados atualizados com sucesso!");
        setEditMode(false);
        window.location.reload();
      } else {
        const err = await response.json();
        alert(err.message || "Erro ao atualizar dados");
      }
    } catch (error) {
      alert("Erro de conexão, tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Logout (mantido do seu código)
  const handleLogout = async () => {
    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

      const response = await fetch("/logout", {
        method: "POST",
        headers: {
          "X-CSRF-TOKEN": token || "",
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
        credentials: "same-origin",
      });

      if (response.ok) {
        window.location.href = "/";
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

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-xl space-y-6">
      <h2 className="text-2xl font-bold text-[#313A4B] dark:text-white">Perfil da Instituição</h2>

      {/* Imagem */}
      <div className="flex justify-center mb-4">
        {previewImagem ? (
          <img
            src={previewImagem}
            alt="Imagem da instituição"
            className="w-40 h-40 object-cover rounded-full border-4 border-sky-700"
          />
        ) : (
          <div className="w-40 h-40 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
            Sem imagem
          </div>
        )}
      </div>

      {editMode && (
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
            Alterar imagem
            <input type="file" accept="image/*" onChange={handleImagemChange} className="hidden" />
          </label>
        </div>
      )}

      <div className="space-y-5">
        {/* Campos básicos */}
        {[
          { label: "Nome", name: "nome", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Senha", name: "password", type: "password" },
          { label: "CNPJ", name: "cnpj", type: "text" },
          { label: "CEP", name: "cep", type: "text" },
          { label: "Rua", name: "rua", type: "text" },
          { label: "Número", name: "numero", type: "text" },
          { label: "Bairro", name: "bairro", type: "text" },
          { label: "Cidade", name: "cidade", type: "text" },
          { label: "Telefone", name: "telefone", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block mb-1 text-gray-600 dark:text-gray-400 font-semibold">{label}</label>
            {editMode ? (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                autoComplete={name === "password" ? "new-password" : undefined}
              />
            ) : name === "password" ? (
              <p className="text-gray-800 dark:text-gray-200">••••••••</p>
            ) : (
              <p className="text-gray-800 dark:text-gray-200">{formData[name] || "—"}</p>
            )}
          </div>
        ))}

        {/* Descrição */}
        <div>
          <label className="block mb-1 text-gray-600 dark:text-gray-400 font-semibold">Descrição</label>
          {editMode ? (
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 resize-none"
            />
          ) : (
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{formData.descricao || "—"}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        {editMode ? (
          <>
            <button
              onClick={salvarAtualizacao}
              disabled={loading}
              className="flex-1 bg-sky-700 hover:bg-sky-800 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
            <button
              onClick={cancelarEdicao}
              disabled={loading}
              className="flex-1 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-200 py-2 rounded-lg font-semibold transition disabled:opacity-50"
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="w-full bg-sky-700 hover:bg-sky-800 text-white py-2 rounded-lg font-semibold transition"
          >
            Editar Perfil
          </button>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
      >
        <LogOut className="w-5 h-5" />
        <span>Sair da conta</span>
      </button>
    </div>
  );
};

export default Conta;
