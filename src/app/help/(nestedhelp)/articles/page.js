import Link from "next/link";
import styles from "./articles.module.css";
import { ArrowRight } from "lucide-react";

const articleData = [
  { title: "Getting Started with Yamka", slug: "getting-started" },
  { title: "Changing Layers", slug: "changing-layers" },
  {
    title: "Troubleshooting GPS Accuracy Issues",
    slug: "gps-accuracy-troubleshooting",
  },
];

export const metadata = {
  title: "Articles",
};

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
              <span className={styles.linkContent}>
                {article.title}
                <ArrowRight size={20} className={styles.arrowIcon} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
