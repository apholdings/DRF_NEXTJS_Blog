import useIsDarkMode from '@/hooks/useIsDarkMode';
import { MoonLoader } from 'react-spinners';

interface ComponentProps {
  color?: string;
  size?: number;
}

export default function LoadingMoon({ color, size = 16 }: ComponentProps) {
  const isDarkMode = useIsDarkMode();

  const loaderColor = color || isDarkMode ? '#000' : '#fff';

  return (
    <div className="flex h-full w-full items-center justify-center">
      <MoonLoader color={loaderColor} size={size} />
    </div>
  );
}

LoadingMoon.defaultProps = {
  size: 16,
  color: '',
};
