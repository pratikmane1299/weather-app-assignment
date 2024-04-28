import type { ResolvingMetadata } from "next";
import "./globals.css";

export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }, parent: ResolvingMetadata) {
  const city = searchParams?.['city'] ? searchParams?.['city'] : 'mumbai';
  const duration = searchParams?.['duration'] ? searchParams?.['duration'] : 'week';

  let durationInMeta = 'Weekly';

  if (duration === 'today') {
    durationInMeta = 'Today\'s';
  }

  let title = `${durationInMeta} weather forecast for ${city}`;

  return {
    title,
    description: 'Weather app built with react',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script async src="https://umami-analytics-service.onrender.com/script.js" data-website-id="a8e5e9e7-44a1-4023-aa6b-bd8d42be4a1a"></script>
      </head>
      <body className={' h-screen overflow-x-hidden'}>{children}</body>
    </html>
  );
}
