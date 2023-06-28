import styles from "../project/project_card/ProjectCard";

import { BsFillTrashFill } from "react-icons/bs";

function ServiceCard({ id, name, description, hendleRemove }) {
    const remove = (e) => {
        e.preventDefault();
        hendleRemove(id);
    };

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>{description}</p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>
            </div>
        </div>
    );
}

export default ServiceCard;
