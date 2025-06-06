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
					slug='english-programming-language'
					title='English language as the next programming language?'
					subtitle='Why natural language fails as code and what we need instead'
					publishDate='2025-06-06'
				></BlogPostCard>
				<BlogPostCard
					slug='building-utter-sense-week-2'
					title='Building utter-sense: The Pivot'
					subtitle="Making a pivot to explore browser-based audio handling while maintaining the project's practical utility"
					publishDate='2025-02-07'
				></BlogPostCard>
				<BlogPostCard
					slug='the-llm-first-sldc-part-1'
					title='The LLM First SDLC - Part 1: A New Approach to Problem Identification'
					subtitle='Rethinking how we find, analyze and prioritize problems to solve.'
					publishDate='2025-01-17'
				></BlogPostCard>
				<BlogPostCard
					slug='building-utter-sense-week-1'
					title='Building utter-sense: A Week of RAG Pipeline Adventures in Salesforce'
					subtitle='Exploring RAG pipelines & Salesforce AI Capabilities to Build a Smart Call Center Assistant'
					publishDate='2025-01-10'
				></BlogPostCard>
				<BlogPostCard
					slug='the-art-of-shipping-things'
					title='The Art of Shipping Software Projects'
					subtitle='A guide to shipping software projects effectively'
					publishDate='2025-01-06'
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
