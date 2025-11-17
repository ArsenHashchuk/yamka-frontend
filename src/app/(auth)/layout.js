import styles from "./auth-layout.module.css";

export default function AuthLayout({ children }) {
  return <main className={styles.authLayout}>{children}</main>;
}
