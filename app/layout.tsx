import { Box } from "@mui/material";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import MenuDrawer2 from "./(components)/MenuDrawer2";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atención farmacéutica",
  description: "Atención farmacéutica basada en evidencias",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={roboto.className}>
        <main className="main">
          <MenuDrawer2>
            <Box sx={{ p: 2 }}>{children}</Box>
          </MenuDrawer2>
        </main>
      </body>
    </html>
  );
}
