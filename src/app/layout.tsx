import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marrakech Tours - Agence de Voyage Authentique",
  description: "Découvrez le Maroc authentique avec nos circuits personnalisés. Marrakech, Fès, Sahara et plus encore.",
  keywords: "Marrakech, tours, voyage Maroc, circuits, Sahara, Fès, agence voyage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="overflow-x-hidden">
      <body className="font-sans overflow-x-hidden min-h-screen">
        <div className="w-full overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
