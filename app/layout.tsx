import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import MenuDrawer2, { appName } from "./(components)/MenuDrawer2";
import { Box } from "@mui/material";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: appName,
  description: "Atención farmacéutica basada en evidencias",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
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
