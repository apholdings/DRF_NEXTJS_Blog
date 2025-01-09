import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const useIsDarkMode = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Este efecto asegura que el componente esté montado antes de evaluar el tema
  useEffect(() => {
    setMounted(true);
  }, []);

  // Este efecto actualiza el valor booleano si el tema es oscuro
  useEffect(() => {
    if (mounted) {
      setIsDarkMode(theme === 'dark');
    }
  }, [theme, mounted]);

  return isDarkMode;
};

export default useIsDarkMode;
