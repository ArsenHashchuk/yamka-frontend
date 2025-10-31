import Link from "next/link";
import styles from "./help-page.module.css";
import {
  ArrowBigRight,
  BadgeInfo,
  BadgeQuestionMark,
  NotebookPen,
} from "lucide-react";

export const metadata = {
  title: "Help",
};

export default function HelpPage() {
  return (
    <div className={styles.helpPageContent}>
      <Link href="/help/articles" className={styles.helpCard}>
        <span className={styles.cardText}>
          <BadgeInfo /> Help Articles
        </span>
        <ArrowBigRight />
      </Link>

      <Link href="/help/faq" className={styles.helpCard}>
        <span className={styles.cardText}>
          <BadgeQuestionMark /> FAQs
        </span>
        <ArrowBigRight />
      </Link>

      <Link
        href="/help/feedback"
        className={`${styles.helpCard} ${styles.feedbackCard}`}
      >
        <span className={styles.cardText}>
          <NotebookPen /> Send Feedback
        </span>
        <ArrowBigRight />
      </Link>
      <Link href="/" className={styles.button}>
        Back To Home
      </Link>
    </div>
  );
}
