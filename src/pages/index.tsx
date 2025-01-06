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
					slug='the-art-of-shipping-things'
					title='The Art of Shipping Software Projects'
					subtitle='A guide to shipping software projects effectively'
					publishDate='2024-01-06'
				></BlogPostCard>
				<BlogPostCard
					slug='react-redux-typescript'
					title='Using React, Redux and TypeScript together, the good, the bad, the ugly'
						subtitle='Exploring the integration of React, Redux, and TypeScript'
					publishDate='2024-01-03'
				></BlogPostCard>
				<BlogPostCard
					slug='getting-unconfused-react-typescript'
					title='Getting Unconfused on React, TypeScript, and how they play together'
					subtitle='A practical guide to React and TypeScript integration'
					publishDate='2023-12-19'
				></BlogPostCard>
			</div>
		</RootLayout>
	);
}
