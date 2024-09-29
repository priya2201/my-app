// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import { PostProvider } from "../app/contexts/PostContext"

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <PostProvider>
//         <body className={`${geistSans.variable} ${geistMono.variable}`}>
//           {children}
//         </body>
//       </PostProvider>
//     </html>
//   );
// }

// // import type { Metadata } from 'next'
// // import './globals.css'
// // import ThemeRegistry from './components/ThemeRegistry'
// // import { PostProvider } from './contexts/PostContext'

// // export const metadata: Metadata = {
// //   title: 'Next App MUI',
// //   description: 'Generated by create next app',
// // }

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode
// // }) {
// //   return (
// //     <html lang="en">
// //       <PostProvider>
// //         <ThemeRegistry>
// //           <body>{children}</body>
// //         </ThemeRegistry>
// //       </PostProvider>

// //     </html >
// //   )
// // }

import type { Metadata } from 'next'
import './globals.css'
import ThemeRegistry from './components/ThemeRegistry'
import { PostProvider } from './contexts/PostContext'

export const metadata: Metadata = {
  title: 'Next App MUI',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <PostProvider>
          <body>{children}</body>
        </PostProvider>
      </ThemeRegistry>

    </html>
  )
}