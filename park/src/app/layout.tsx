
import "./globals.css";

import { Toaster } from "react-hot-toast";


export default function RootLayout({children}: Readonly<{ children: React.ReactNode;}>) {


  return (
    <html lang="en">
      <body className=" antialiased">
         <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );

  
}
