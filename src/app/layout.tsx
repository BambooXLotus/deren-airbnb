import "~/styles/globals.css";

import { Nunito } from "next/font/google";
import { Navbar } from "~/components/Navbar";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
