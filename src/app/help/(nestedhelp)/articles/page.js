import Link from "next/link";
import styles from "./articles.module.css";

const articleData = [
  { title: "Getting Started with Yamka", slug: "getting-started" },
  { title: "How to Save a Route Offline", slug: "save-route-offline" },
  { title: "Managing Your Custom Layers", slug: "managing-custom-layers" },
  {
    title: "Troubleshooting GPS Accuracy Issues",
    slug: "gps-accuracy-troubleshooting",
  },
];

export default function ArticlesIndexPage() {
  return (
    <div className={styles.articlesContainer}>
      <h1 className={styles.articlesTitle}>All Help Articles</h1>

      <ul className={styles.articleList}>
        {articleData.map((article) => (
          <li key={article.slug} className={styles.articleListItem}>
            <Link
              href={`/help/articles/${article.slug}`}
              className={styles.articleLink}
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
