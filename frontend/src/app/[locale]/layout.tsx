import { Navbar } from "@/components/navbar/Navbar";
import "./global.css";

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Bootcamp",
  icons: {
    icon: "/favicon.ico",
  },
};

type RootLayoputProps = {
  readonly children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const RootLayout = async ({ children, params }: RootLayoputProps) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <div className="flex flex-col justify-start bg-blue-800 w-screen h-screen">
            <Navbar />
            <div className="flex grow overflow-scroll">
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
