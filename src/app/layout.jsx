import { SiteExperience } from "@/components/SiteExperience";
import "./globals.css";
export const metadata = {
    title: "Spartan Security Solutions | Trusted Security. A Safer Tomorrow.",
    description: "Professional security, housekeeping, gardening and skilled manpower services from Spartan Security Solutions.",
    icons: {
        icon: "/assets/brand/spartan-seal.png",
        shortcut: "/assets/brand/spartan-seal.png",
    },
};
export const viewport = {
    themeColor: "#111111",
};
export default function RootLayout({ children }) {
    return (<html lang="en">
      <head>
        <link rel="icon" href="/assets/brand/spartan-seal.png" type="image/png"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <SiteExperience>{children}</SiteExperience>
      </body>
    </html>);
}
