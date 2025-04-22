import { Navbar } from "@/components/navbar/Navbar";
import "./global.css";

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bootcamp",
  icons: {
    icon: "/favicon.ico",
  },
};

type RootLayoputProps = {
  readonly children: React.ReactNode;
};

const RootLayout = ({
  children,
}: RootLayoputProps) => {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col justify-start bg-blue-800 w-screen h-screen">
          <Navbar />
          <div className="flex grow overflow-scroll">
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </div>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
