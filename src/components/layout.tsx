import React from "react";
import Head from "next/head";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ 
	subsets: ["latin"],
	variable: '--font-jetbrains-mono'
});

const metadata = {
	title: "Compiler Blog",
	description:
		"Description of my pageThis is my personal blog which is a place where I write about things that interest me, musings and other topics that I find interesting.",
	keywords: ["blog", "compiler"],
	creator: "Valon Loshaj",
	alternates: {
		canonical: "/",
		languages: {
			"en-US": "/en-US",
		},
	},
	icons: {
		icon: "/vl-logo.png",
		shortcut: "/vl-logo.png",
		apple: "/vl-logo.png",
		other: {
			url: "/vl-logo.png",
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Head>
				<title>{metadata.title}</title>
				<meta name='description' content={metadata.description} />
				<meta name='keywords' content={metadata.keywords.join(", ")} />
				<meta name="theme-color" content="#141414" />
				<meta name="color-scheme" content="dark" />
				<link rel='canonical' href={metadata.alternates.canonical} />
				<link rel='icon' href={metadata.icons.icon} />
				<link rel='shortcut icon' href={metadata.icons.shortcut} />
				<link rel='apple-touch-icon' href={metadata.icons.apple} />
				<link 
					href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" 
					rel="stylesheet"
				/>
			</Head>
			<div className={`${inter.className} ${jetbrainsMono.variable}`}>
				{children}
			</div>
		</>
	);
}
