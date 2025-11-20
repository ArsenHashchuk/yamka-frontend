"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

import styles from "./sign-in-form.module.css";

import { signInDefaultValues } from "@/src/lib/constants";
import { signInWithCredentials } from "@/src/lib/actions/user.actions";

export default function SignInForm() {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (data?.success) {
      window.location.href = callbackUrl;
    }
  }, [data, callbackUrl]);

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <button disabled={pending} className={styles.button} type="submit">
        {pending ? "Signing In..." : "Sign In"}
      </button>
    );
  };

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className={styles.formWrapper}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={signInDefaultValues.email}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
            defaultValue={signInDefaultValues.password}
            className={styles.input}
          />
        </div>
        <div>
          <SignInButton />
        </div>

        {data && !data.success && (
          <div className={styles.errorText}>{data.message}</div>
        )}

        <div className={styles.signUpLinkContainer}>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" target="_self" className={styles.signUpLink}>
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
}
