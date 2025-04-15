import Navbar from "@/components/navbar/Navbar";
import "./global.css";

import ReactQueryProvider from "@/providers/ReactQueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
