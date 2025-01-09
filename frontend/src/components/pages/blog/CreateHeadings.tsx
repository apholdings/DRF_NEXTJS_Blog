import { useState } from 'react';
import { IHeading } from '@/interfaces/blog/IHeading';
import HeadingsSec from './HeadingsSec';

export default function CreateHeadings() {
  const [headings, setHeadings] = useState<IHeading[]>([]);
  return <HeadingsSec headings={headings} setHeadings={setHeadings} />;
}
