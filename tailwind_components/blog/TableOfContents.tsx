import { IHeading } from '@/interfaces/blog/IHeading';
import { useEffect, useState } from 'react';

export default function TableOfContents({ headings }: { headings: IHeading[] }) {
  const [activeSlug, setActiveSlug] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      let closestHeadingSlug = '';
      let closestHeadingDistance = Number.POSITIVE_INFINITY;

      headings.forEach((heading) => {
        const element = document.getElementById(heading.slug);
        if (element) {
          const distance = Math.abs(element.getBoundingClientRect().top);
          if (distance < closestHeadingDistance) {
            closestHeadingDistance = distance;
            closestHeadingSlug = heading.slug;
          }
        }
      });

      setActiveSlug(closestHeadingSlug);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  function scrollToSection(slug: string) {
    // Find the element with the ID that matches the slug
    const section = document.getElementById(slug);
    if (section) {
      // Use scrollIntoView to smoothly scroll to the section
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  return (
    <div className="col-span-5 m-2 rounded p-6">
      <h1 className="mb-2 text-xl">Table of contents</h1>
      <ul className="dark:divide-dark-border divide-y">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollToSection(heading.slug)}
            className="w-full text-left"
            type="button"
          >
            <li
              className={`dark:text-dark-txt cursor-pointer text-sm text-gray-500 dark:hover:text-violet-400 ${
                activeSlug === heading.slug ? 'font-bold text-[#2181e2] dark:text-violet-400' : ''
              } py-2.5`}
            >
              {heading.title}
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
}
