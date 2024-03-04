import Link from "next/link";
import styles from "../styles/Home.module.css";
import RootLayout from "../components/layout";
import BlogPostCard from "../components/BlogPostCard";

export default function Home() {
	return (
		<RootLayout>
			<div className={styles.main}>
				<h1 className={styles.blogHeadline}>.compiler blog</h1>
				<p className={styles.description}>by: Valon Loshaj</p>
				<p className={styles.description}>
					This is my personal blog which is a place where I write
					about things that interest me, musings and other topics that
					I find interesting.
				</p>
				<BlogPostCard
					blogDir='react-redux-typescript'
					title='Using React, Redux and TypeScript together, the good, the bad, the ugly'
					publishDate='2024-01-03'
					subtitle='Subtitle for the blog post card'
				></BlogPostCard>
				<BlogPostCard
					blogDir='getting-unconfused-react-typescript'
					title='Getting Unconfused on React, TypeScript, and how they play together'
					publishDate='2023-12-19'
					subtitle='Subtitle for the blog post card'
				></BlogPostCard>
				<BlogPostCard
					blogDir='remove-duplicates-array'
					title='Wordle, meet Code-dle...Remove duplicates from array'
					publishDate='2024-12-16'
					subtitle='Subtitle for the blog post card'
				></BlogPostCard>
				<BlogPostCard
					blogDir='integer-to-roman'
					title='Wordle, meet Code-dle...integer to roman'
					publishDate='2023-12-14'
					subtitle='Subtitle for the blog post card'
				></BlogPostCard>
			</div>
		</RootLayout>
	);
}
