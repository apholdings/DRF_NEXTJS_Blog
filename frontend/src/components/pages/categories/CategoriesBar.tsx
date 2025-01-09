import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useClickOutside } from 'react-click-outside-hook';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import CategoriesList from './CategoriesList';

interface ComponentProps {
  categories: any[];
  loading: boolean;
}

export default function CategoriesBar({ categories, loading }: ComponentProps) {
  const [searchBy, setSearchBy] = useState<string>('');

  // Function to sanitize input
  const sanitizeInput = (input: string) =>
    input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');

  // Handle onChange event
  const handleChange = (event: any) => {
    const sanitizedValue = sanitizeInput(event.target.value);
    setSearchBy(sanitizedValue);
  };

  const router = useRouter();
  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push(`/search/${searchBy}`);
  };

  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef<HTMLInputElement>(null);

  const inputFocus = useCallback(() => {
    inputRef.current?.focus();
  }, []); // inputRef is stable, so no dependencies are needed

  const inputUnFocus = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, []); // inputRef is stable, so no dependencies are needed

  const expandContainer = useCallback(() => {
    setExpanded(true);
    inputFocus(); // Assuming inputFocus might depend on external state or props, which it currently does not
  }, [inputFocus]); // inputFocus is included as a dependency

  const collapseContainer = useCallback(() => {
    setExpanded(false);
    inputUnFocus();
    setSearchBy('');
    if (inputRef.current) {
      inputRef.current.value = ''; // Direct manipulation like this is generally discouraged in React
    }
  }, [inputUnFocus]); // inputUnFocus is included as a dependency

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside, collapseContainer]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const keydownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === '/' && e.ctrlKey) {
        e.preventDefault();
        expandContainer();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        collapseContainer();
      }
    },
    [expandContainer, collapseContainer],
  );

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, [keydownHandler]);

  // State to manage window width
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // Handle resizing
  useEffect(() => {
    // Function to update the width
    const updateWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set width on initial component mount
    updateWidth();
    // Add event listener for window resize
    window.addEventListener('resize', updateWidth);

    // Clean up listener
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Define a threshold for small devices
  const smallDeviceWidth = 640; // Example for tailwind's 'sm' breakpoint

  return (
    <div ref={parentRef} className="dark:bg-dark-bg h-14 w-full bg-[#1c1d1f]">
      {isExpanded ? (
        <form onSubmit={handleSearch} className="flex items-center justify-between p-4 px-6">
          <input
            type="text"
            name="searchBy"
            value={searchBy}
            onChange={handleChange}
            ref={inputRef}
            onFocus={() => expandContainer()}
            className="dark:bg-dark-bg text-dark-txt w-full bg-[#1c1d1f] focus:outline-none"
          />
          <button type="button" aria-label="search button">
            <XMarkIcon onClick={collapseContainer} className="h-5 w-auto text-white" />
          </button>
        </form>
      ) : (
        <div className="flex flex-nowrap items-center justify-between p-4 px-6">
          <div className="text-white">
            <button onClick={expandContainer} type="button" aria-label="search button">
              <MagnifyingGlassIcon className="h-5 w-auto" />
            </button>
          </div>
          {loading ? (
            <LoadingMoon color="#fff" size={20} />
          ) : (
            <div className="text-white">
              <CategoriesList
                categories={categories}
                windowWidth={windowWidth}
                smallDeviceWidth={smallDeviceWidth}
              />
            </div>
          )}
          {windowWidth > smallDeviceWidth && <div />}
        </div>
      )}
    </div>
  );
}
