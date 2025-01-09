import { IHeading } from '@/interfaces/blog/IHeading';
import { v4 as uuidv4 } from 'uuid';
import HeadingsList from './HeadingsList';

interface ComponentProps {
  headings: IHeading[];
  setHeadings: any;
}

export default function HeadingsSec({ headings, setHeadings }: ComponentProps) {
  const handleAddHeading = () => {
    const newItem: IHeading = {
      id: uuidv4(), // Ensure this always generates a unique ID
      order: headings.length + 1,
      title: '',
      slug: '',
      level: '',
    };

    setHeadings([...headings, newItem]);
  };

  return (
    <div>
      <div className="py-5">
        <div className="-mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="mt-2">
            <h3 className="font-bold text-gray-900">Headings</h3>
          </div>
          <div className="mt-2 shrink-0">
            <button
              type="button"
              onClick={handleAddHeading}
              className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Heading
            </button>
          </div>
        </div>
      </div>
      <div className="block">
        <ul className="space-y-4 py-4">
          <HeadingsList headings={headings} setHeadings={setHeadings} />
        </ul>
      </div>
    </div>
  );
}
