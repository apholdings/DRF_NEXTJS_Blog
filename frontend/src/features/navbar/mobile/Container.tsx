interface ComponentProps {
  children: React.ReactNode;
}

export default function Container({ children }: ComponentProps) {
  return <nav className="mx-auto block max-w-full border-b md:hidden">{children}</nav>;
}
