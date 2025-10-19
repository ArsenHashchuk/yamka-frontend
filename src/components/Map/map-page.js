"use client";

import dynamic from "next/dynamic";
import styles from "./map-page.module.css";

const Map = dynamic(() => import("@/components/Map/map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function MapPage() {
  return (
    <main className={styles.main}>
      <Map />
    </main>
  );
}
