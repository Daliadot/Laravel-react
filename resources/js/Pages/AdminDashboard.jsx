import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [pendentes, setPendentes] = useState([]);
  const [aceitos, setAceitos] = useState([]);
  const [erroAuth, setErroAuth] = useState(false); // ⬅️ novo estado para mostrar erro

  useEffect(() => {
    fetch("http://localhost:8000/admin/dashboard", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Não autenticado");
        }
        return res.json();
      })
      .then(() => {
        fetch("http://localhost:8000/api/Instituicao", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((dados) => {
            setPendentes(dados.filter((item) => item.status === "pendente"));
            setAceitos(dados.filter((item) => item.status === "aceito"));
          });
      })
      .catch(() => {
        setErroAuth(true); // ⬅️ apenas marca como não autenticado
      });
  }, []);

  const atualizarStatus = (id, status) => {
    fetch(`http://localhost:8000/api/Instituicao/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then(async (res) => {
        const dados = await res.json();
        if (res.ok && dados.success) {
          setPendentes((prev) => prev.filter((inst) => inst.id !== id));
          if (status === "aceito") {
            fetch(`http://localhost:8000/api/Instituicao/${id}`, {
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((inst) => setAceitos((prev) => [...prev, inst]));
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          setAceitos((prev) => prev.filter((inst) => inst.id !== id));
        } else {
          alert("Erro ao excluir a instituição.");
        }
      })
      .catch(() => alert("Erro de conexão ao excluir a instituição."));
  };

  // ⬇️ Mostra mensagem caso não autenticado
  if (erroAuth) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl text-red-600 font-bold">Acesso negado</h2>
        <p>Você não está autenticado como administrador.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 rounded-2xl space-y-8">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 dark:bg-[#0D0D0D] bg-gray-100 lg:px-8 lg:py-14 mx-auto shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h2 className="text-3xl font-extrabold dark:text-[#b0b0b0] text-[#313A4B]">
          Painel do Administrador
        </h2>

        <div className="mb-8">
          <h2 className="text-xl mb-4">Iniciativas Pendentes</h2>
          {pendentes.length === 0 && <p>Nenhuma iniciativa pendente.</p>}
          <ul>
            {pendentes.map((inst) => (
              <li key={inst.id} className="mb-4 p-4 border shadow-md rounded">
                <h3 className="font-bold text-lg">{inst.nome}</h3>
                <p>{inst.descricao}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    className="bg-green-600 text-white h-10 px-4 py-1 rounded-full"
                    onClick={() => atualizarStatus(inst.id, "aceito")}
                  >
                    Aceitar
                  </button>
                  <button
                    className="bg-red-600 text-white h-10 px-4 py-1 rounded-full"
                    onClick={() => atualizarStatus(inst.id, "rejeitado")}
                  >
                    Recusar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl mb-4">Iniciativas Aceitas</h2>
          {aceitos.length === 0 && <p>Nenhuma iniciativa aceita.</p>}
          <ul>
            {aceitos.map((inst) => (
              <li key={inst.id} className="mb-4 p-4 border rounded">
                <h3 className="font-bold">{inst.nome}</h3>
                <p>{inst.descricao}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    className="bg-gray-700 text-white px-4 py-1 rounded"
                    onClick={() => excluirInstituicao(inst.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
