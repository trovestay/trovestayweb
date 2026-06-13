'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Footer from './Footer';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isPropertyDetails = pathname.match(/^\/properties\/[^\/]+$/);

  const isLocations = pathname.startsWith('/locations');
  const isProfile = pathname.startsWith('/profile');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      <main>{children}</main>
      {!isLocations && !isProfile && <Footer />}
    </>
  );
}
