import { Inertia } from '@inertiajs/inertia';
import React from 'react';

export default function InstituicoesPendentes({ instituicoes }) {
  const aprovar = (id) => Inertia.post(`/admin/instituicoes/${id}/aprovar`);
  const rejeitar = (id) => Inertia.post(`/admin/instituicoes/${id}/rejeitar`);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Instituições Pendentes</h1>
      {instituicoes.length === 0 ? (
        <p>Nenhuma instituição pendente no momento.</p>
      ) : (
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Nome</th>
              <th className="p-2">Email</th>
              <th className="p-2">Descrição</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {instituicoes.map(inst => (
              <tr key={inst.id} className="border-t">
                <td className="p-2">{inst.nm_instituicao}</td>
                <td className="p-2">{inst.email_instituicao}</td>
                <td className="p-2">{inst.descricao}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => aprovar(inst.id)} className="bg-green-600 text-white px-2 py-1 rounded">Aprovar</button>
                  <button onClick={() => rejeitar(inst.id)} className="bg-red-600 text-white px-2 py-1 rounded">Rejeitar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
