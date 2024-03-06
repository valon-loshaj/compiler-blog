import { GetServerSideProps } from "next";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import RootLayout from "../components/layout";
import styles from "../styles/Home.module.css";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { slug } = context.params as { slug: string };

	try {
		// Construct the path to the blog post file
		const filePath = path.join(process.cwd(), "src", "posts", `${slug}.md`);

		// Read the file content
		const content = fs.readFileSync(filePath, "utf8");

		return {
			props: {
				content,
			},
		};
	} catch (error) {
		console.error("Failed to read the post content:", error);

		// If there's an error, return notFound: true to render a 404 page
		return { notFound: true };
	}
};

interface BlogPostProps {
	content: string;
}

export default function BlogPost({ content }: BlogPostProps) {
	return (
		// <RootLayout>
		<div className={styles.main}>
			<ReactMarkdown>{content}</ReactMarkdown>
		</div>
		// </RootLayout>
	);
}
