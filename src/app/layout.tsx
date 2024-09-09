"use client";
import { Provider } from "react-redux";
import Navbarr from "./_components/UI/Navbarr";
import "./globals.css";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Navbarr />
          <div className="">{children}</div>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
