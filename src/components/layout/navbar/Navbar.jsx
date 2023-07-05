import { Link } from "react-router-dom";

import Container from "../container/Container";

import styles from "./Navbar.module.css";

import { Context } from "../../../context/UserContext";

import { useContext } from "react";

function Navbar() {

    const {authenticated, logout} = useContext(Context);

    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/home" className={styles.dex}>
                    <h1>DEX</h1>
                </Link>
                <ul className={styles.list}>
                    {authenticated ? (<>
                        <li className={styles.item}>
                            <Link to="/user/profile">Perfil</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/home">Home</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/projects">Tarefas</Link>
                        </li>
                        <li className={styles.item} onClick={logout}>Sair</li></>
                        ) : (
                        <>
                            <li className={styles.item}>
                                <Link to="/signin">Sign in</Link>
                            </li>
                        </>
                    )

                    }
                    
                </ul>
            </Container>
        </nav>
    );
}

export default Navbar;
