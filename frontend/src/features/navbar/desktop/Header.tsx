export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex max-w-7xl items-center justify-between">{children}</div>
  );
}
