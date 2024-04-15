import "./globals.css";
import { ThemeProvider } from "./theme-provider";

export const metadata = {
  title: "NINU",
  description: "NINU system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`bg-lighter dark:bg-darker text-darker dark:text-lighter transition-all`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
