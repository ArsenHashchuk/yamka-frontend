import Link from "next/link";
import styles from "../help-page.module.css";

export default function HelpLayout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Link href="./" className={styles.button}>
        Back
      </Link>
    </>
  );
}
