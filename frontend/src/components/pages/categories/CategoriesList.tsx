import { Fragment } from 'react';
import Link from 'next/link';
import slugify from 'react-slugify';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import CategoryListItem from './CategoryListItem';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface ComponentProps {
  categories: any[];
  windowWidth: number;
  smallDeviceWidth: number;
}

export default function CategoriesList({
  categories,
  windowWidth,
  smallDeviceWidth,
}: ComponentProps) {
  // Render dropdown for small devices
  if (windowWidth < smallDeviceWidth) {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 text-sm font-bold text-white">
            Article Categories
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </MenuButton>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {categories.map((category) => (
                <MenuItem key={category?.slug}>
                  {({ focus }) => (
                    <Link
                      href={`/category/${slugify(category)}`}
                      className={classNames(
                        focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      )}
                    >
                      {category?.name}
                    </Link>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    );
  }

  // Render horizontal list for larger devices
  return (
    <div className="flex flex-nowrap items-center space-x-6">
      {categories.map((category) => (
        <CategoryListItem key={category?.slug} category={category} />
      ))}
    </div>
  );
}
