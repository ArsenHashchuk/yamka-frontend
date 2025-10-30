import styles from "./articlesSlug.module.css";

export default function ArticlePage({ params }) {
  const { slug } = params;

  // in future fetch from some api/server
  const article = {
    title: `Article: ${slug.replace(/-/g, " ").toUpperCase()}`,
    date: "October 30, 2025",
    content: `This is the detailed content for the article with the slug **${slug}**.
    
    <h2>Section 1: Overview</h2>
    <p>Here you would explain the key concept of this help topic. Next.js App Router uses folders to define routes, and the **[slug]** syntax tells the router that this segment is dynamic.</p>
    
    <h2>Section 2: Step-by-Step Guide</h2>
    <p>To implement this in your project, you put the \`page.jsx\` file inside a folder named \`[slug]\` within your articles directory.</p>`,
  };

  // We use dangerouslySetInnerHTML for demonstration, but for real content
  // you should use a secure markdown renderer to avoid XSS vulnerabilities.

  return (
    <div className={styles.articlePageContainer}>
      <h1 className={styles.articleTitle}>{article.title}</h1>
      <small className={styles.lastUpdated}>Last Updated: {article.date}</small>

      <div
        className={styles.articleContent}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}
