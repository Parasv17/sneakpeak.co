import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Rubik } from "next/font/google";

const rubik = Rubik({ weight: ['400', '500', '600', '700', '800', '900'],subsets: ["latin"] });



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SneakPeak.co",
  description: "Ecommerce platform for sneakerheads",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}
      <Toaster /></body>
    </html>
  );
}
