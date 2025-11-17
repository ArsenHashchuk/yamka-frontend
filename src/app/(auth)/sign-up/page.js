import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { APP_NAME } from "@/src/lib/constants";

import styles from "../sign-in/sign-in-page.module.css";

import SignUpForm from "./sign-up-form";

export const metadata = {
  title: "Sign Up",
};

export default async function SignUpPage({ searchParams }) {
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
          <h1 className={styles.cardTitle}>Create Account</h1>
          <p className={styles.cardDescription}>
            Enter your informatin below to sign up
          </p>
        </div>
        <div className={styles.cardContent}>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
