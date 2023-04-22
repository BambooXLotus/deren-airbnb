import "~/styles/globals.css";

import { Nunito } from "next/font/google";
import { RegisterModal } from "~/components/modals/RegisterModal";
import { Navbar } from "~/components/navbar/Navbar";
import ToasterProvider from "~/providers/ToasterProvider";

export const metadata = {
  title: "Deren Airbnb",
  description: "Airbnb Clone in NextJs13",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
