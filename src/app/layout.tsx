import "./globals.css";
// import TitleBar from "../components/titleBar";
import { ThemeProvider } from "@/components/theme-provider";
import { DataProvider } from "@/components/dataContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <DataProvider>
            {/*<TitleBar />*/}
            {children}
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
