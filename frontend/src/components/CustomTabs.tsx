import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

interface ComponentProps {
  titles: string[];
  panels: any[];
  width?: string;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function CustomTabs({ titles, panels, width = 'md:w-32 w-full' }: ComponentProps) {
  function getTabClassName(selected: any) {
    return classNames(
      `flex items-center justify-center col-span-1 ${width}`,
      selected
        ? 'bg-gray-100 focus:outline-none dark:bg-dark-second'
        : 'hover:bg-gray-100 dark:hover:bg-dark-second',
    );
  }

  return (
    <TabGroup>
      <TabList className="grid space-x-1 space-y-1 sm:flex sm:space-x-2 sm:space-y-0">
        {titles?.map((title) => (
          <Tab key={title} className={({ selected }) => getTabClassName(selected)}>
            {title}
          </Tab>
        ))}
      </TabList>
      <TabPanels>{panels?.map((panel) => <TabPanel key={panel}>{panel}</TabPanel>)}</TabPanels>
    </TabGroup>
  );
}

CustomTabs.defaultProps = {
  width: 'md:w-32 w-full',
};
