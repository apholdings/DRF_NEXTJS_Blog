interface ComponentProps {
  children: React.ReactNode;
}

export default function Container({ children }: ComponentProps) {
  return (
    <nav className="hidden border-b border-black px-4 py-2 md:static md:block md:overflow-y-visible lg:px-6 dark:border-white">
      {children}
    </nav>
  );
}
