import Aside from "@/components/aside/aside";
import MapPage from "@/components/Map/map-page";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Aside />
      <MapPage />
    </div>
  );
}
