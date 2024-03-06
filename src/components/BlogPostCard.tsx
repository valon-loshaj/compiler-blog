import Link from "next/link";
import styles from "../styles/Home.module.css";

interface BlogPostCardProps {
	title: string;
	subtitle: string;
	publishDate: string;
	blogDir: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
	title,
	publishDate,
	subtitle,
	blogDir,
}) => {
	return (
		<a className={styles.card} href={`/${blogDir}`}>
			<h2>{title}</h2>
			<p>{publishDate}</p>
			<p>{subtitle}</p>
		</a>
	);
};

export default BlogPostCard;
