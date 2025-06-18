import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const DarkModeSwitch = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const cookieTheme = Cookies.get('theme');
    const darkStored = cookieTheme === 'dark';
    setIsDark(darkStored);
    if (darkStored) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = (e) => {
    const checked = e?.target?.checked ?? !document.documentElement.classList.contains('dark');
    setIsDark(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      Cookies.set('theme', 'dark', { expires: 365 });
    } else {
      document.documentElement.classList.remove('dark');
      Cookies.set('theme', 'light', { expires: 365 });
    }
  };

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        onChange={toggleDarkMode}
        checked={isDark}
      />
      <Icon icon="tabler:sun" className="swap-off text-yellow-500 size-7" />
      <Icon icon="tabler:moon" className="swap-on text-gray-300 size-7" />
    </label>
  );
};

export default DarkModeSwitch;
