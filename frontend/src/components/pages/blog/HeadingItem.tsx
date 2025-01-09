import EditSelect from '@/components/forms/EditSelect';
import EditSlug from '@/components/forms/EditSlug';
import EditText from '@/components/forms/EditText';
import { IHeading } from '@/interfaces/blog/IHeading';
import { Bars3Icon, TrashIcon } from '@heroicons/react/24/solid';

interface ComponentProps {
  heading: IHeading;
  setHeadings: React.Dispatch<React.SetStateAction<IHeading[]>>;
}

export default function HeadingItem({ setHeadings, heading }: ComponentProps) {
  const handleRemoveHeading = (id: string) => {
    setHeadings((prevHeadings) => {
      const updatedHeadings = prevHeadings.filter((item) => item.id !== id);
      return updatedHeadings.map((item, index) => ({
        ...item,
        order: index + 1,
      }));
    });
  };

  const handleUpdateHeading = (
    id: string,
    key: keyof Omit<IHeading, 'id' | 'order'>,
    value: string,
  ) => {
    setHeadings((prevHeadings) =>
      prevHeadings.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    );
  };

  return (
    <li className="flex w-full items-center gap-4" style={{ listStyle: 'none' }}>
      <div className="flex-1">
        <EditText
          data={heading.title}
          setData={(value: string) => handleUpdateHeading(heading.id, 'title', value)}
          placeholder="Enter title"
        />
      </div>
      <div className="flex-1">
        <EditSlug
          data={heading.slug}
          setData={(value: string) => handleUpdateHeading(heading.id, 'slug', value)}
          placeholder="Enter slug"
        />
      </div>
      <div className="flex-1">
        <EditSelect
          data={heading.level}
          setData={(value: string) => handleUpdateHeading(heading.id, 'level', value)}
          options={['H1', 'H2', 'H3', 'H4']}
          placeholder="Select level"
        />
      </div>

      {/* Add data-swapy-handle to the drag handle element */}
      <button type="button" className="text-gray-500 hover:text-gray-700" data-swapy-handle>
        <Bars3Icon className="h-5 w-5" />
      </button>

      {/* Add data-swapy-no-drag to prevent dragging from the delete button */}
      <button
        type="button"
        data-swapy-no-drag
        onClick={() => handleRemoveHeading(heading.id)}
        className="text-red-500 hover:text-red-700"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </li>
  );
}
