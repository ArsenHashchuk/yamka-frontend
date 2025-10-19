import styles from "./nav-item.module.css";

export default function NavItem({ icon: Icon, title }) {
  return (
    // <a href="#" style={currentStyle} title={title}>
    //   <Icon size={20} />
    // </a>
    <a href="#" title={title} className={styles.navItem}>
      <Icon size={20} />
    </a>
  );
}
