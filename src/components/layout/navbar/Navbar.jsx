import { Link } from "react-router-dom";

import Container from "../container/Container";

import styles from "./Navbar.module.css";

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/home" className={styles.dex}>
                    <h1>DEX</h1>
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/home">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/projects">Tarefas</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    );
}

export default Navbar;
