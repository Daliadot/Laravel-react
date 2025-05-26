import React, { useEffect } from 'react';

function CorsTest() {
  useEffect(() => {
    fetch('http://localhost:8000/api/test-cors')
      .then(res => res.json())
      .then(data => console.log('Resposta da API:', data))
      .catch(err => console.error('Erro CORS:', err));
  }, []);

  return (
    <div>
      <h2>Testando CORS...</h2>
      <p>Verifique o console do navegador para ver o resultado.</p>
    </div>
  );
}

export default CorsTest;
