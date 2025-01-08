"use client"; // Required for client-side functionality

import { UserProvider } from "./shared/utils/userContext";
import NavBar from "./shared/NavBar";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./globals.css"; // Add any additional global styles
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <NavBar />
          <div>
            
          </div>
          <main className="container my-4">{children}</main>
        </body>
      </UserProvider>
    </html>
  );
}
