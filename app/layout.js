import "./globals.css";

export const metadata = {
  title: "Mayank Vishwakarma | Full Stack Developer & Data Science Enthusiast",
  description:
    "Portfolio of Mayank Vishwakarma — B.Tech CSE student specializing in Data Science, passionate about full-stack development, AI, and modern technology.",
  keywords: [
    "Mayank Vishwakarma",
    "Portfolio",
    "Full Stack Developer",
    "Data Science",
    "Web Developer",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Mayank Vishwakarma" }],
  openGraph: {
    title: "Mayank Vishwakarma | Full Stack Developer",
    description:
      "Interactive portfolio showcasing projects, skills, and coding journey.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
