import ClientLayoutWrapper from '../components/ClientLayoutWrapper';
import '../styles/global.css';

export const metadata = {
  title: 'Ephraim Becker — Citizen of Ares City',
  description: "Ephraim Becker's personal portfolio website redesign in the Ares City OS theme.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}

