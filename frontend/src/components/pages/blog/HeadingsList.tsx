import { IHeading } from '@/interfaces/blog/IHeading';
import HeadingItem from './HeadingItem';

interface ComponentProps {
  headings: IHeading[];
  setHeadings: any;
}

export default function HeadingsList({ headings, setHeadings }: ComponentProps) {
  return (
    <ul className="space-y-2">
      {headings
        .sort((a, b) => a.order - b.order) // Sort items by `order` before rendering
        .map((heading) => (
          <HeadingItem key={heading.id} heading={heading} setHeadings={setHeadings} />
        ))}
    </ul>
  );
}
