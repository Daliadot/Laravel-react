import  { useState } from 'react';
import Home from './pages/Home.jsx';
import Admin from './pages/Admin.jsx';
import Termos from './pages/Termos.jsx';
import Ajuda from './pages/Ajuda.jsx';
import LoginONG from './Pages/Ong/LoginIniciativa.jsx';
import Mensagens from './pages/Mensagens.jsx';
import ONGPage from './pages/Ong/ONGPage.jsx';
import Conta from './Pages/Conta.jsx';
import AdminDashboard from './Pages/AdminDashboard.jsx';
import Login2 from './Pages/User/LoginVoluntario.jsx'
import Iniciativas from './pages/Iniciativa.jsx';



export default function MainContent({ activePage }) {
  const [isOpen, setIsOpen] = useState(true); 

  return (
    <div className="bg-white dark:bg-[#1a1a1a] border-2 rounded-md border-[rgba(0,0,0,0.08)] h-full p-6 shadow-sm flex-1 flex-col overflow-auto">
      {activePage === 'Home' && <Home />}
      {activePage === 'Temas' && <Temas />}
      {activePage === 'Admin' && <Admin />}
      {activePage === 'Termos de uso' && <Termos />}
      {activePage === 'Ajuda?' && <Ajuda />}
      {activePage === 'Saiba mais' && <ONGPage/>}
      {activePage === 'Entre na sua conta' && <LoginONG/>}
      {activePage === 'Iniciativas' && <Iniciativas/>}
      {activePage === 'AdinDashboard' && <AdminDashboard/>}     
      {activePage === 'Conta' && <Conta/>}
      {activePage === 'Login' && < Login2/>}
      {activePage === 'Mensagens' && (
        <Mensagens isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
}
