// app/layout.tsx
import { Suspense } from 'react';
import Loading from './loading';

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)  {
  return (
    <html>
      <body>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}