import React from "react";
import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
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
				<link rel='canonical' href={metadata.alternates.canonical} />
				<link rel='icon' href={metadata.icons.icon} />
				<link rel='shortcut icon' href={metadata.icons.shortcut} />
				<link rel='apple-touch-icon' href={metadata.icons.apple} />
			</Head>
			<div>
				<div className={inter.className}>{children}</div>
			</div>
		</>
	);
}
