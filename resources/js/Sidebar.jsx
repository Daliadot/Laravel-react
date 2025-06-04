// Importa ícones da biblioteca lucide-react
import { BookHeart, Box, ChevronDown, Home, Menu, Sun, Moon, MessageSquare, SmilePlus, User, Wrench, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Sidebar = ({ isOpen, setIsOpen, setActivePage }) => {
  const [activeDropdown, setActiveDropdown] = useState('');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Verifica se o tema escuro está ativo no HTML
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  
  const navItems = [
    { title: 'Home', icon: Home, hasDropdown: false },
    { 
      title: 'Perfil',
      icon: User,
      hasDropdown: true,
      dropdownItems: ['Login', 'Conta']
    },
    { title: 'Iniciativas', icon: BookHeart, hasDropdown: false },
    { title: 'Mensagens', icon: MessageSquare, hasDropdown: false },
    { title: 'Admin', icon: Box, hasDropdown: false },
    {
      title: 'Configurações',
      icon: Wrench,
      hasDropdown: true,
      dropdownItems: ['Termos de uso', 'Ajuda?','LoginUser']
    },
    {
      title: 'É uma iniciativa?', 
      icon: SmilePlus,
      hasDropdown: true,
      dropdownItems:[ 'Saiba mais', 'Entre na sua conta' ]
    }
  ];

  return (
    <div 
      className={`
        transition-all duration-300 ease-in-out text-sm border-2 rounded-md 
        ${isOpen ? 'w-64' : 'w-16'} 
        bg-white text-black border-[rgba(0,0,0,0.08)] 
        dark:bg-[#1A1A1A] dark:text-gray-200 dark:border-gray-700
      `}
    >
      {/* TOPO */}
      <div className="p-4 flex justify-between items-center">
        <h1 className={`
          font-bold overflow-hidden transition-all duration-300 text-lg text-nowrap
          ${isOpen ? 'opacity-100' : 'opacity-0'} 
          text-[#2f486e] dark:text-gray-100
        `}>
          Care.ly
          <p className="text-gray-600 text-[13px] dark:text-gray-400">
            Conectando quem quer cuidar.
          </p>
        </h1>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="hover:bg-[#F3F5F7] dark:hover:bg-[#2C2C2C] p-2 rounded-lg"
        >
          {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="mt-6">
        {navItems.map((item) => (
          <div key={item.title}>
            <div 
              className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[#F3F5F7] dark:hover:bg-[#2C2C2C]"
              onClick={() => {
                if (item.hasDropdown && isOpen) {
                  setActiveDropdown(activeDropdown === item.title ? '' : item.title);
                } else {
                  setActivePage(item.title);
                }
              }}
            >
              <div className="flex items-center">
                <item.icon size={20} strokeWidth={1.5} color={'#1D4ED8'} />
                <span className={`ml-4 transition-all whitespace-nowrap overflow-hidden 
                  ${isOpen ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}>
                  {item.title}
                </span>
              </div>

              {item.hasDropdown && isOpen && (
                <ChevronDown 
                  size={16} 
                  strokeWidth={1.5}
                  className={`transition-transform duration-200 
                    ${activeDropdown === item.title ? 'rotate-180' : ''}`}
                />
              )}
            </div>

            {/* Dropdown aberto */}
            {item.hasDropdown && isOpen && activeDropdown === item.title && (
              <div className="bg-[#f5f5f5] dark:bg-[#2C2C2C] overflow-hidden transition-all duration-200">
                {item.dropdownItems.map((dropdownItem) => (
                  <div
                    key={dropdownItem}
                    className="px-11 py-2 hover:bg-[#f1f1f1] dark:hover:bg-[#3D3D3D] cursor-pointer text-sm"
                    onClick={() => setActivePage(dropdownItem)}
                  >
                    {dropdownItem}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="mt-8 px-4">
  <button
    onClick={toggleDarkMode}
    className="fixed bottom-5 items-center justify-between bg-[#F3F5F7] dark:bg-[#2C2C2C] p-2 rounded-full transition"
  >
    <div className="flex items-center gap-2">
      {isDark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-gray-400" />}
      <span className={`${isOpen ? 'block' : 'hidden'} text-sm text-gray-700 dark:text-gray-200`}>
      </span>
    </div>
  </button>
</div>
    </div>
  );
};

export default Sidebar;
