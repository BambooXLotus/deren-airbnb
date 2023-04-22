import "~/styles/globals.css";

import { Nunito } from "next/font/google";
import { Navbar } from "~/components/navbar/Navbar";
import { Modal } from "~/components/modals/Modal";
import { RegisterModal } from "~/components/modals/RegisterModal";

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
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
