import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    nome: '',
    email: '',
    password: '',
    cpf: '',
    imagem: null,
  });

  const [showUpload, setShowUpload] = useState(false);
  const [previews, setPreviews] = useState([]);

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('submit chamado', data);
  
  post('/api/usuarios', {
    forceFormData: true,
    onSuccess: () => {
      window.location.href = '/';
    },
    onError: (errors) => {
      console.error(errors);
      alert('Erro no cadastro');
    }
  });
};



  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setData('imagem', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews([reader.result]);
      };
      reader.readAsDataURL(file);
    } else {
      setData('imagem', null);
      setPreviews([]);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="lg:mx-auto lg:w-full lg:max-w-sm">
        <img
          alt="Care.ly"
          src="https://i.postimg.cc/NjVmBH7g/Dark-left-logo.png"
          className="mx-auto h-20 rounded-lg w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Crie sua conta de voluntário
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-900">
              Nome Completo
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={data.nome}
              onChange={(e) => setData('nome', e.target.value)}
              required
              className="mt-2 block w-full rounded-md px-3 py-1.5 text-base"
            />
            {errors.nome && <div className="text-red-500 text-sm mt-1">{errors.nome}</div>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              required
              className="mt-2 block w-full rounded-md px-3 py-1.5 text-base"
            />
            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              required
              className="mt-2 block w-full rounded-md px-3 py-1.5 text-base"
            />
            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
          </div>

          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-900">
              CPF
            </label>
            <input
              id="cpf"
              name="cpf"
              type="text"
              value={data.cpf}
              onChange={(e) => setData('cpf', e.target.value)}
              required
              className="mt-2 block w-full rounded-md px-3 py-1.5 text-base"
            />
            {errors.cpf && <div className="text-red-500 text-sm mt-1">{errors.cpf}</div>}
          </div>

          <div>
            <button
              type="button"
              onClick={() => setShowUpload(!showUpload)}
              className="w-full border border-sky-800 text-sky-600 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-sky-950"
            >
              {showUpload ? "Cancelar Upload" : "Adicionar Imagem"}
            </button>

            {showUpload && (
              <div className="mt-3">
                <label className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl h-32 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mb-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7h2l2-3h10l2 3h2a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 11a3 3 0 100 6 3 3 0 000-6z"
                      />
                    </svg>
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

          <div>
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-indigo-600 text-white py-2 rounded-md"
            >
              {processing ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Já possui conta?{' '}
          <Link href="/login/voluntario" className="text-indigo-600 hover:underline">
            Entre aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
