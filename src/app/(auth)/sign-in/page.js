import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { APP_NAME } from "@/src/lib/constants";

import styles from "./sign-in-page.module.css";

import SignInForm from "./sign-in-form";

export const metadata = {
  title: "Sign In",
};

export default async function SignInPage({ searchParams }) {
  const { callbackUrl } = await searchParams;

  const session = false;

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/images/logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
              priority={true}
            />
          </Link>
          <h1 className={styles.cardTitle}>Sign In</h1>
          <p className={styles.cardDescription}>Sign in to your account</p>
        </div>
        <div className={styles.cardContent}>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
