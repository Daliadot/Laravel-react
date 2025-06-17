import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
    console.log("Token CSRF capturado no Home:", token);
  }, []);
  return (
<>

<div className="dark:bg-[#0D0D0D] bg-gray-100 "> 
{/**O que nós somos? */}
       
<div className="max-w-[85rem] px-4 py-10 sm:px-6 dark:bg-[#0D0D0D]  bg-gray-100 lg:px-8 lg:py-14 mx-auto">
  {/* Grid */}
  <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
    <div>
      <img className="rounded-xl" src="https://images.unsplash.com/photo-1648737963503-1a26da876aca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&h=900&q=80" alt="Features Image" />
    </div>
    {/* End Col */}

    <div className="mt-5 sm:mt-10 lg:mt-0">
      <div className="space-y-6 sm:space-y-8">
        {/* Title */}
        <div className="space-y-2 md:space-y-4">
          <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-neutral-200">
          Junte-se a quem faz a diferença
          </h2>
          <p className="text-gray-800 dark:text-neutral-400">
          O Care.ly conecta voluntários a causas sociais que precisam de apoio. Descubra como você pode contribuir para um mundo melhor.
          </p>
        </div>
        {/* End Title */}

        {/* List */}
        <ul className="space-y-2 sm:space-y-4">
          <li className="flex gap-x-3">
            <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <div className="grow">
              <span className="text-sm sm:text-base text-gray-800 dark:text-neutral-400">
                <span className="font-bold">Faça parte de uma comunidade engajada e solidária</span>
              </span>
            </div>
          </li>

          <li className="flex gap-x-3">
            <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <div className="grow">
              <span className="text-sm sm:text-base text-gray-800 dark:text-neutral-400">
              Desenvolva habilidades interpessoais e profissionais <span className="font-bold"></span>
              </span>
            </div>
          </li>

          <li className="flex gap-x-3">
            <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <div className="grow">
              <span className="text-sm sm:text-base text-gray-800 dark:text-neutral-400">
              Descubra o poder de transformar vidas — inclusive a sua.
              </span>
            </div>
          </li>
        </ul>
        {/* End List */}
      </div>
    </div>
    {/* End Col */}
  </div>
  {/* End Grid */}
</div>
{/* End Features */}
{/**Fim do que nós somos */}


{/* Porque o Care.ly*/}
{/* Icon Blocks */}
<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  {/* Grid */}
  <div className="grid md:grid-cols-2 gap-12">
    <div className="lg:w-3/4">
      <h2 className="text-3xl text-gray-800 font-bold lg:text-4xl dark:text-neutral-200">
      Encontre propósito e pertencimento em cada ação      </h2>
      <p className="mt-3 text-gray-800 dark:text-neutral-400">
      No Care.ly, acreditamos que pertencer é mais do que estar presente — é ser reconhecida, valorizada e inspirada. Cada iniciativa que você apoia fortalece vínculos com a comunidade e reafirma que suas atitudes importam. Ser voluntária é se sentir útil, acolhida e movida por um propósito genuíno: cuidar do outro e crescer com isso.      </p>
      <p className="mt-5">
        <a className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500" href="#">
          Contact sales to learn more
          <svg className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </a>
      </p>
    </div>
    {/* End Col */}

    <div className="space-y-6 lg:space-y-10">
      {/* Icon Block */}
      <div className="flex gap-x-5 sm:gap-x-8">
        {/* Icon */}
        <span className="shrink-0 inline-flex justify-center items-center size-11 rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
          <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        </span>
        <div className="grow">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
          Sobre o Care.ly
          </h3>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
          O Care.ly nasceu da vontade de facilitar o voluntariado. Com uma interface simples e intuitiva, nosso objetivo é aproximar quem quer ajudar de quem precisa de apoio.          </p>
        </div>
      </div>
      {/* End Icon Block */}

      {/* Icon Block */}
      <div className="flex gap-x-5 sm:gap-x-8">
        {/* Icon */}
        <span className="shrink-0 inline-flex justify-center items-center size-11 rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
          <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
        </span>
        <div className="grow">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
          Como funciona?
          </h3>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
          Você cria um perfil, seleciona causas com as quais se identifica, e o sistema mostra iniciativas sociais próximas a você. Simples, rápido e transformador!          </p>
        </div>
      </div>
      {/* End Icon Block */}

      {/* Icon Block */}
      <div className="flex gap-x-5 sm:gap-x-8">
        {/* Icon */}
        <span className="shrink-0 inline-flex justify-center items-center size-11 rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
          <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
        </span>
        <div className="grow">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
          Por que ser voluntária?          </h3>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
          Ser voluntária vai além de ajudar: é desenvolver empatia, habilidades interpessoais e criar conexões verdadeiras com a comunidade.</p>
        </div>
      </div>
      {/* End Icon Block */}
    </div>
    {/* End Col */}
  </div>
  {/* End Grid */}
</div>
{/* End Icon Blocks */}
{/*Fim do por que */}


{/**Parceiros care.ly */}
{/* Card Blog */}
<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  {/* Title */}
  <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-neutral-200">Colaboradores</h2>
    <p className="mt-1 text-gray-600 dark:text-neutral-400">Cada parceira passa por um processo de verificação para garantir que seu tempo e energia sejam bem investidos. Você pode se voluntariar com segurança, sabendo que está apoiando projetos reais, com impacto comprovado e liderados por pessoas dedicadas.

Juntas, essas instituições transformam comunidades, e com a sua ajuda, o alcance delas pode ser ainda maior.</p>
  </div>
  {/* End Title */}

  {/* Grid */}
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Card */}
    <a className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg focus:outline-hidden focus:border-transparent focus:shadow-lg transition duration-300 rounded-xl p-5 dark:border-neutral-700 dark:hover:border-transparent dark:hover:shadow-black/40 dark:focus:border-transparent dark:focus:shadow-black/40" href="#">
      <div className="aspect-w-16 aspect-h-11">
        <img className="w-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1633114128174-2f8aa49759b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Blog Image" />
      </div>
      <div className="my-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:group-hover:text-black">
        Mães Pela Vida 
        </h3>
        <p className="mt-5 text-gray-600 dark:text-neutral-400">
        Rede de apoio para mães solo em situação de vulnerabilidade, com oficinas profissionalizantes e auxílio psicológico.        </p>
      </div>
      <div className="mt-auto flex items-center gap-x-3">
        <img className="size-8 rounded-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar" />
        <div>
          <h5 className="text-sm text-gray-800 dark:text-neutral-200">By Lauren Waller</h5>
        </div>
      </div>
    </a>
    {/* End Card */}

    {/* Card */}
    <a className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg focus:outline-hidden focus:border-transparent focus:shadow-lg transition duration-300 rounded-xl p-5 dark:border-neutral-700 dark:hover:border-transparent dark:hover:shadow-black/40 dark:focus:border-transparent dark:focus:shadow-black/40" href="#">
      <div className="aspect-w-16 aspect-h-11">
        <img className="w-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1562851529-c370841f6536?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Blog Image" />
      </div>
      <div className="my-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:group-hover:text-black">
        Abraço Animal
        </h3>
        <p className="mt-5 text-gray-600 dark:text-neutral-400">
        Centro de resgate e adoção responsável de cães e gatos, com foco em castração e campanhas educativas.        </p>
      </div>
      <div className="mt-auto flex items-center gap-x-3">
        <img className="size-8 rounded-full" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar" />
        <div>
          <h5 className="text-sm text-gray-800 dark:text-neutral-200">By Aaron Larsson</h5>
        </div>
      </div>
    </a>
    {/* End Card */}

    {/* Card */}
    <a className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg focus:outline-hidden focus:border-transparent focus:shadow-lg transition duration-300 rounded-xl p-5 dark:border-neutral-700 dark:hover:border-transparent dark:hover:shadow-black/40 dark:focus:border-transparent dark:focus:shadow-black/40" href="#">
      <div className="aspect-w-16 aspect-h-11">
        <img className="w-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1521321205814-9d673c65c167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Blog Image" />
      </div>
      <div className="my-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:group-hover:text-white">
        Tecendo Futuro
        </h3>
        <p className="mt-5 text-gray-600 dark:text-neutral-400">
        Projeto que oferece aulas de tecnologia e empreendedorismo para adolescentes de escolas públicas.        </p>
      </div>
      <div className="mt-auto flex items-center gap-x-3">
        <img className="size-8 rounded-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar" />
        <div>
          <h5 className="text-sm text-gray-800 dark:text-neutral-200">By Lauren Waller</h5>
        </div>
      </div>
    </a>
    {/* End Card */}
  </div>
  {/* End Grid */}

 
</div>
{/* End Card Blog */}
</div>

</>
  )};
  export default Home;