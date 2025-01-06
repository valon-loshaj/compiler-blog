import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import RootLayout from '@/components/layout'
import styles from '@/styles/BlogPost.module.css'
import Link from 'next/link'

interface BlogPostProps {
  content: string
  frontmatter: {
    title: string
    date: string
    subtitle: string
  }
}

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), 'src/posts')
  const filenames = fs.readdirSync(postsDirectory)
  
  const paths = filenames.map(filename => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<BlogPostProps, Params> = async ({ params }) => {
  const { slug } = params!
  const filePath = path.join(process.cwd(), 'src/posts', `${slug}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    props: {
      content: content || '',
      frontmatter: {
        title: data.title || '',
        date: data.date || '',
        subtitle: data.subtitle || ''
      }
    }
  }
}

export default function BlogPost({ content, frontmatter }: BlogPostProps) {
  return (
    <RootLayout>
      <nav className={styles.nav}>
        <Link href="/" className={styles.homeLink}>
          .compiler blog
        </Link>
      </nav>
      <article className={styles.blogPost}>
        <header>
          <h1>{frontmatter.title}</h1>
          <p className={styles.date}>{frontmatter.date}</p>
          {frontmatter.subtitle && (
            <p className={styles.subtitle}>{frontmatter.subtitle}</p>
          )}
        </header>
        <div className={styles.content}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </article>
    </RootLayout>
  )
} 