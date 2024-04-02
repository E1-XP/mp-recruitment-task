import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Roboto } from "next/font/google";

import "./../styles/globals.css";

import QueryProvider from "@/providers/query";
import { ThemeProvider } from "@mui/material";
import { MUITheme } from "@/styles/theme";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Mediporta task",
  description: "App maade for recruitment purposes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <QueryProvider>
            <ThemeProvider theme={MUITheme}>{children}</ThemeProvider>
          </QueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
