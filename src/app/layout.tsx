import "~/styles/globals.css";

import { Nunito } from "next/font/google";
import getCurrentUser from "~/actions/getCurrentUser";
import { LoginModal } from "~/components/modals/LoginModal";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
