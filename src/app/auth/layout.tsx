export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="min-h-screen bg-gray-500">{children}</main>
    </div>
  );
}
