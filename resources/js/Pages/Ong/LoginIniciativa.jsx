import { useState } from "react";
 
export default function LoginForm() {
  // Estados para controlar a exibição do modal, do campo de upload e as imagens carregadas
  const [showModal, setShowModal] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
 
  // Função para lidar com o upload de imagens e gerar previews
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Adiciona o resultado (URL da imagem) ao array de previews
          setPreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file); // Converte a imagem para base64
      });
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-zinc-800 bg-gray-100 p-4">
      {/* Caixa de login */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center dark:text-[#7a7a7a] text-gray-800">Login</h2>
 
        {/* Formulário de login */}
        <form className="space-y-4">
          <div>
            <label className="block mb-1 dark:text-[#7a7a7a] font-medium">Email</label>
            <input type="email" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="seu@email.com" />
          </div>
          <div>
            <label className="block dark:text-[#7a7a7a] mb-1 font-medium">Senha</label>
            <input type="password" className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-blue-600 dark:bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700">Entrar</button>
        </form>
 
        {/* Botão para abrir o modal de cadastro */}
        <button onClick={() => setShowModal(true)} className="w-full mt-2 border border-blue-600 text-blue-600 py-2 rounded-lg dark:hover:bg-zinco-90 hover:bg-blue-50">Cadastre-se</button>
      </div>
 
      {/* Modal de cadastro */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
<div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
{/* Botão para fechar o modal */}
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl">×</button>
            <h3 className="text-xl font-bold  dark:text-[#7a7a7a] text-center mb-4">Cadastro</h3>
 
            {/* Formulário de cadastro */}
            <form className="space-y-4 ">
              {/* Campos padrão */}
              <div>
                <label className="block mb-1 dark:text-[#7a7a7a] font-medium">Nome da Instituição</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="Seu nome completo" />
              </div>
              <div>
                <label className="block mb-1 dark:text-[#7a7a7a] font-medium">Email</label>
                <input type="email" className="w-full border rounded-lg px-4 py-2" placeholder="seu@email.com" />
              </div>
              <div>
                <label className="block mb-1  dark:text-[#7a7a7a] font-medium">Senha</label>
                <input type="password" className="w-full border rounded-lg px-4 py-2" placeholder="Crie uma senha" />
              </div>
              <div>
                <label className="block mb-1 dark:text-[#7a7a7a] font-medium">Confirmar Senha</label>
                <input type="password" className="w-full border rounded-lg px-4 py-2" placeholder="Confirme a senha" />
              </div>
 
              {/* Campos adicionais */}
              <div>
                <label className="block mb-1 dark:text-[#7a7a7a] font-medium">CNPJ (opcional)</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="00.000.000/0000-00" />
              </div>
              <div>
                <label className="block mb-1 dark:text-[#7a7a7a] font-medium">CEP</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="Insira o Cep" />
              </div>
              <div>
                <label className="block mb-1 dark:text-[#7a7a7a] font-medium">Rua</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="Nome da rua" />
              </div>
              <div>
                <label className="block mb-1 dark:text-[#7a7a7a] font-medium">Numero</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="Numero" />
              </div>
              <div>
                <label className="block mb-1 dark:text-[#7a7a7a] font-medium">Bairro</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="Bairro" />
              </div>
              <div>
                <label className="block mb-1 dark:text-[#7a7a7a] font-medium">Cidade</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="Cidade" />''
              </div>
              <div>
                <label className="block mb-1 dark:text-[#7a7a7a] font-medium">Telefone</label>
                <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="Insira o Telefone" />
              </div>
              <div>
                <label className="block mb-1 dark:text-[#7a7a7a] font-medium">Descrição Detalhada</label>
                <textarea className="w-full border rounded-lg px-4 py-2" rows={4} placeholder="Fale um pouco mais sobre sua organização ou propósito..." />
              </div>
 
              {/* Upload opcional de imagens */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowUpload(!showUpload)}
                  className="w-full border border-sky-800 text-sky-600 py-2 rounded-lg   dark:hover:bg-sky-950 hover:bg-blue-50"
                >
                  {showUpload ? "Cancelar Upload" : "Adicionar Imagem"}
                </button>
 
                {/* Área de upload e previews */}
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
                        {/* Ícone SVG de upload */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h2l2-3h10l2 3h2a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11a3 3 0 100 6 3 3 0 000-6z" />
                        </svg>
                        <span className="text-sm font-medium">Selecionar imagem</span>
                      </div>
                    </label>
 
                    {/* Previews das imagens selecionadas */}
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
 
              {/* Botão de envio do cadastro */}
              <button type="submit" className="w-full bg-sky-800  text-white py-2 rounded-xl hover:bg-sky-700">Cadastrar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
