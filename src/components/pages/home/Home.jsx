import styles from "./Home.module.css";
import savings from "../../../img/todolist.svg";
import LinkButton from "../../layout/link_button/LinkButton";

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>
                Bem Vindo ao <span>DEX</span>
            </h1>
            <p>Comece a gerenciar suas tarefas agora mesmo!</p>
            <LinkButton to="/newproject" text="Criar Card" />
            <img src={savings} alt="todolist"></img>
        </section>
    );
}

export default Home;
