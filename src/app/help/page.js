import Link from "next/link";
import styles from "./help-page.module.css";

const HelpPage = () => {
  return (
    <div className={styles.helpPageContent}>
      <Link href="/help/articles" className={styles.helpCard}>
        <span className={styles.cardText}>❓ Help Articles</span>
        <span>&gt;</span>
      </Link>

      <Link href="/help/faq" className={styles.helpCard}>
        <span className={styles.cardText}>💬 FAQs</span>
        <span>&gt;</span>
      </Link>

      <Link
        href="/help/feedback"
        className={`${styles.helpCard} ${styles.feedbackCard}`}
      >
        <span className={styles.cardText}>📝 Send Feedback</span>
        <span>&gt;</span>
      </Link>
      <Link href="/" className={styles.button}>
        Back To Home
      </Link>
    </div>
  );
};

export default HelpPage;
