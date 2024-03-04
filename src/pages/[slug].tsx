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
		const content = await response.text();

		return {
			props: {
				content,
			},
		};
	} catch (error) {
		console.error("Failed to fetch the post content:", error);

		// If there's an error, you can return notFound: true to render a 404 page,
		// or redirect: { destination: '/some-redirect' } to redirect the user.
		// Here we'll just return empty content.
		return {
			props: {
				content: "",
			},
		};
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
