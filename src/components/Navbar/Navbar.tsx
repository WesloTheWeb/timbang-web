import Link from "next/link";
import navigationMenu from "@/config/Navigation/Navigation";
import styles from "./Navbar.module.scss";

const { navbar, navList, navLink } = styles;

const Navbar = () => {
    return (
        <nav className={navbar}>
            <ul className={navList}>
                {navigationMenu.map(({ navTitle, path }) => (
                    <li key={path}>
                        <Link href={path} className={navLink}>
                            {navTitle}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
