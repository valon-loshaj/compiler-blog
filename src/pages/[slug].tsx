import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import RootLayout from "../components/layout";
import styles from "../styles/Home.module.css";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { slug } = context.params as { slug: string };

	try {
		const response = await fetch(
			`https://raw.githubusercontent.com/valon-loshaj/blog-posts/main/posts/${slug}.md`
		);

		// Check if the response was successful
		if (!response.ok) {
			// If the response was not ok (like a 404 status), return notFound: true
			return { notFound: true };
		}

		const content = await response.text();

		return {
			props: {
				content,
			},
		};
	} catch (error) {
		console.error("Failed to fetch the post content:", error);

		// If there's an error, return notFound: true to render a 404 page
		return { notFound: true };
	}
};

interface BlogPostProps {
	content: string;
}

export default function BlogPost({ content }: BlogPostProps) {
	return (
		<RootLayout>
			<div className={styles.main}>
				<ReactMarkdown>{content}</ReactMarkdown>
			</div>
		</RootLayout>
	);
}
