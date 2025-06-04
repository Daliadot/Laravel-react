import { useForm, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const { props } = usePage();
  const status = props.status;

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/login/voluntario'); // certifique-se que essa rota existe no Laravel
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="lg:mx-auto lg:w-full lg:max-w-sm">
        <img
          alt="Care.ly"
          src="https://i.postimg.cc/NjVmBH7g/Dark-left-logo.png"
          className="mx-auto h-20 rounded-lg w-auto"
        />
        <h2 className="mt-10 text-center dark:text-sky-900  text-2xl font-bold tracking-tight text-gray-900">
          Entre na sua conta de voluntário...
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium dark:text-white text-gray-900">
              Digite seu email
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
            {errors.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>

          <div>
            <label htmlFor="password"  className="block text-sm   dark:text-white font-medium text-gray-900">
              Senha
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
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>

          {status && (
            <span className="txt_error block mb-4 text-green-600">{status}</span>
          )}

          <div>
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-indigo-600 text-white py-2 rounded-md"
            >
              {processing ? 'Entrando...' : 'Logue-se'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Não possui conta?{' '}
          <Link href="/CadastroVoluntario" className="text-indigo-600 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
