'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Footer from './Footer';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isPropertyDetails = pathname.match(/^\/properties\/[^\/]+$/);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {!isPropertyDetails && <Navigation />}
      <main>{children}</main>
      <Footer />
    </>
  );
}
