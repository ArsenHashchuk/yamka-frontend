import { House, Search, Layers, Settings, User, LogOut } from "lucide-react";

import NavItem from "./nav-item";
import styles from "./aside.module.css";

export default function Aside() {
  return (
    <aside id="sidebar" className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        {/* Logo/App Title */}
        <div className={styles.logo}>
          <span style={{ fontWeight: 800, fontSize: "1.25rem" }}>Y</span>
        </div>

        {/* Primary Navigation */}
        <nav className={styles.nav}>
          <NavItem icon={House} title="Home" />
          <NavItem icon={Search} title="Search" />
          <NavItem icon={Layers} title="Layers" />
          <NavItem icon={Settings} title="Settings" />
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className={styles.bottomNav}>
        <NavItem icon={User} title="User" />
        <NavItem icon={LogOut} title="Logout" />
      </div>
    </aside>
  );
}
