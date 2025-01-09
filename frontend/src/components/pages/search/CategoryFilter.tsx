import { ICategoryList } from '@/interfaces/blog/ICategory';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

interface ComponentProps {
  categories: ICategoryList[];
  categoriesSlugList: string[];
  setCategoriesSlugList: any;
}

export default function CategoryFilter({
  categories,
  categoriesSlugList,
  setCategoriesSlugList,
}: ComponentProps) {
  const handleToggleCategory = (categorySlug: string) => {
    setCategoriesSlugList((prevSelected: any) => {
      if (prevSelected.includes(categorySlug)) {
        // If already selected, unselect it
        return prevSelected.filter((slug: string) => slug !== categorySlug);
      }

      return [...prevSelected, categorySlug];
    });
  };

  return (
    <Disclosure as="div" className="border-b border-gray-200 py-6">
      <h3 className="-my-3 flow-root">
        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
          <span className="font-medium text-gray-900">Categories</span>
          <span className="ml-6 flex items-center">
            <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
            <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
          </span>
        </DisclosureButton>
      </h3>
      <DisclosurePanel className="pt-6">
        <div className="space-y-4">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <button
                type="button"
                key={category.slug}
                onClick={() => handleToggleCategory(category.slug)}
                className="flex w-full cursor-pointer space-x-1"
              >
                {categoriesSlugList?.includes(category.slug) ? (
                  <i className="bx bx-checkbox-square dark:text-dark-txt text-2xl text-gray-700" />
                ) : (
                  <i className="bx bx-checkbox dark:text-dark-txt text-2xl text-gray-700" />
                )}
                <div className="dark:text-dark-txt-secondary mt-1.5 text-sm text-gray-700">
                  {category?.name}
                </div>
              </button>
            ))
          ) : (
            <>No categories found</>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
