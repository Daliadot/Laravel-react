import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [pendentes, setPendentes] = useState([]);
  const [aceitos, setAceitos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/Instituicao", {
      credentials: "include", // para enviar cookies se necessário
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((dados) => {
        setPendentes(dados.filter((item) => item.status === "pendente"));
        setAceitos(dados.filter((item) => item.status === "aceito"));
      })
      .catch((err) => {
        console.error("Erro ao carregar dados:", err);
        alert("Erro ao buscar instituições.");
      });
  }, []);

  const atualizarStatus = (id, status) => {
    fetch(`http://localhost:8000/api/Instituicao/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
      credentials: "include", // garantir envio de cookies se precisar autenticação
    })
      .then(async (res) => {
        const dados = await res.json();
        if (res.ok && dados.success) {
          setPendentes((prev) => prev.filter((inst) => inst.id !== id));
          if (status === "aceito") {
            // Busca os dados atualizados da instituição aceita para adicionar à lista
            fetch(`http://localhost:8000/api/Instituicao/${id}`, {
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            })
              .then((res) => res.json())
              .then((inst) => setAceitos((prev) => [...prev, inst]))
              .catch((err) => {
                console.error("Erro ao buscar instituição aceita:", err);
              });
          }
        } else {
          alert(dados.message || "Erro ao atualizar o status da instituição.");
        }
      })
      .catch((err) => {
        console.error("Erro na requisição:", err);
        alert("Erro ao atualizar o status da instituição.");
      });
  };

  const excluirInstituicao = (id) => {
    fetch(`http://localhost:8000/api/Instituicao/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setAceitos((prev) => prev.filter((inst) => inst.id !== id));
        } else {
          alert("Erro ao excluir a instituição.");
        }
      })
      .catch((err) => {
        console.error("Erro de conexão ao excluir:", err);
        alert("Erro de conexão ao excluir a instituição.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0D0D0D] text-[#313A4B] dark:text-[#b0b0b0] p-8 flex flex-col items-center">
      <div className="max-w-5xl w-full bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-lg p-10 space-y-12">
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 break-words">Painel do Administrador</h1>
          <p className="text-gray-600 dark:text-gray-400 break-words">
            Gerencie as instituições cadastradas. Aceite, recuse ou exclua conforme necessário.
          </p>
        </header>

        {/* Pendentes */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
            Iniciativas Pendentes
          </h2>
          {pendentes.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 italic">Nenhuma iniciativa pendente.</p>
          ) : (
            <ul className="space-y-6">
              {pendentes.map((inst) => (
                <li
                  key={inst.id}
                  className="bg-gray-50 dark:bg-[#222222] rounded-xl border border-gray-300 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6"
                >
                  {/* Imagem */}
                  <div className="flex-shrink-0 w-full sm:w-40 h-28 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-700">
                    {inst.imagem ? (
                      <img
                        src={inst.imagem}
                        alt={`Imagem da instituição ${inst.nome}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600 text-sm">
                        Sem imagem
                      </div>
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex flex-col flex-grow min-w-0">
                    <h3 className="text-xl font-semibold mb-1 truncate" title={inst.nome}>
                      {inst.nome}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed break-words overflow-auto max-h-32">
                      {inst.descricao}
                    </p>
                    <div className="flex gap-4 flex-wrap">
                      <button
                        onClick={() => atualizarStatus(inst.id, "aceito")}
                        className="flex-1 sm:flex-none bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-2 px-6 rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                        aria-label={`Aceitar ${inst.nome}`}
                      >
                        Aceitar
                      </button>
                      <button
                        onClick={() => atualizarStatus(inst.id, "rejeitado")}
                        className="flex-1 sm:flex-none bg-[#ef4444] hover:bg-[#b91c1c] text-white py-2 px-6 rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#ef4444]"
                        aria-label={`Recusar ${inst.nome}`}
                      >
                        Recusar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Aceitos */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
            Iniciativas Aceitas
          </h2>
          {aceitos.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 italic">Nenhuma iniciativa aceita.</p>
          ) : (
            <ul className="space-y-6">
              {aceitos.map((inst) => (
                <li
                  key={inst.id}
                  className="bg-gray-50 dark:bg-[#222222] rounded-xl border border-gray-300 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 items-center"
                >
                  <div className="flex-shrink-0 w-full sm:w-40 h-28 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-700">
                    {inst.imagem ? (
                      <img
                        src={inst.imagem}
                        alt={`Imagem da instituição ${inst.nome}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600 text-sm">
                        Sem imagem
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-grow min-w-0">
                    <h3 className="text-xl font-semibold truncate" title={inst.nome}>
                      {inst.nome}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed break-words overflow-auto max-h-32">
                      {inst.descricao}
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-4 sm:mt-0 flex gap-4">
                    <button
                      onClick={() => excluirInstituicao(inst.id)}
                      className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-6 rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-700"
                      aria-label={`Excluir ${inst.nome}`}
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
