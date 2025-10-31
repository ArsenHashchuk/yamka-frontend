import Image from "next/image";
import styles from "./help-layout.module.css";
import { APP_NAME } from "@/src/lib/constants";

export default function HelpLayout({ children }) {
  return (
    <div className={styles.helpSectionWrapper}>
      <Image
        src="/images/logo.svg"
        width={48}
        height={48}
        alt={`${APP_NAME || "App"} logo`}
      />
      <div className={styles.card}>
        <h1 className={styles.helpTitle}>How can we help you?</h1>
        <main>{children}</main>
      </div>
    </div>
  );
}
