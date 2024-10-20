import { GlobalProviders } from "@/components/custom/globalProviders";
import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const poppins = Poppins({
  weight: ['400', '300', '500', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "cooperfilme",
  description: "Feito com muito café!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`flex flex-col w-screen h-dvh overflow-hidden bg-background ${poppins.className}`}
      >
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
