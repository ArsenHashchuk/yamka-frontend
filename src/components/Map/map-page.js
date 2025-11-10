"use client";

import dynamic from "next/dynamic";
import styles from "./map-page.module.css";
import { useSelector } from "react-redux";
import Image from "next/image";
import { APP_NAME } from "@/src/lib/constants";

const Map = dynamic(() => import("@/src/components/Map/map"), {
  loading: () => (
    <div className={styles.loadingContainer}>
      <Image
        src="/images/logo.svg"
        width={96}
        height={96}
        alt={`${APP_NAME || "App"} logo`}
        priority={true}
      />
    </div>
  ),
  ssr: false,
});

export default function MapPage() {
  const routeData = useSelector((state) => state.ui.route);

  return (
    <main className={styles.main}>
      <Map routeData={routeData} />
    </main>
  );
}
