import Link from "next/link";
import styles from "../styles/Home.module.css";

interface BlogPostCardProps {
	slug: string;
	title: string;
	subtitle: string;
	publishDate: string;
	blogDir: string;
}

export function BlogPostCard({ slug, title, ...props }: BlogPostCardProps) {
	return (
		<Link 
			href={`/posts/${slug}`} 
			prefetch={true}
			className={styles.card}
		>
			<h2>{title}</h2>
			<p>{props.publishDate}</p>
			<p>{props.subtitle}</p>
		</Link>
	);
}

export default BlogPostCard;
