import { useState } from "react";

export default function CadastroInstituicao() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cnpj, setCnpj] = useState(null);
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemBase64, setImagemBase64] = useState("");
  const [previews, setPreviews] = useState([]);
  const [showUpload, setShowUpload] = useState(false);

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result]);
        setImagemBase64(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    if (password !== confirmPassword) {
    alert("As senhas não coincidem!");
    return;
  }

    const payload = {
      nome: nome,
      email,
      password,
      cnpj,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      telefone,
      descricao,
      imagem: imagemBase64 || null,
    };

    try {
      const response = await fetch("http://localhost:8000/api/Instituicao", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert("Instituição cadastrada com sucesso!");
        window.location.href = "/"; // redireciona para página inicial
      } else {
        alert("Erro no cadastro: " + (responseData.message || "Erro desconhecido"));
        console.log("Erros:", responseData.errors);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-zinc-800 bg-gray-100 p-4">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl w-full max-w-2xl space-y-6 overflow-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-center dark:text-[#7a7a7a] text-gray-800">
          Cadastro Instituição
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="Nome da Instituição" value={nome} onChange={setNome} />
          <Input label="Email" value={email} onChange={setEmail} type="email" />
          <Input label="Senha" value={password} onChange={setPassword} type="password" />
          <Input label="Confirmar Senha" type="password" value={confirmPassword} onChange={setConfirmPassword} />
          <Input label="CNPJ (opcional)" value={cnpj} onChange={setCnpj} />
          <Input label="CEP" value={cep} onChange={setCep} />
          <Input label="Rua" value={rua} onChange={setRua} />
          <Input label="Número" value={numero} onChange={setNumero} />
          <Input label="Bairro" value={bairro} onChange={setBairro} />
          <Input label="Cidade" value={cidade} onChange={setCidade} />
          <Input label="Telefone" value={telefone} onChange={setTelefone} />

          <div>
            <label className="block mb-1 dark:text-[#7a7a7a] font-medium">Descrição Detalhada</label>
            <textarea
              className="w-full border rounded-lg px-4 py-2"
              rows={4}
              placeholder="Fale um pouco mais sobre sua organização ou propósito..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div>
            <button
              type="button"
              onClick={() => setShowUpload(!showUpload)}
              className="w-full border border-sky-800 text-sky-600 py-2 rounded-lg dark:hover:bg-sky-950 hover:bg-blue-50"
            >
              {showUpload ? "Cancelar Upload" : "Adicionar Imagem"}
            </button>

            {showUpload && (
              <div className="mt-3">
                <label className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl h-32 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center text-gray-500">
                    📷
                    <span className="text-sm font-medium">Selecionar imagem</span>
                  </div>
                </label>

                {previews.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {previews.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`Preview ${index}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-sky-800 text-white py-2 rounded-xl hover:bg-sky-700"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

// Input auxiliar
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
