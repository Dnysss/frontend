import { Link } from "react-router-dom";

import styles from "./ProjectCard.module.css";
import { BsFillInfoCircleFill, BsFillTrashFill } from "react-icons/bs";

function ProjectCard({ id, name, category, description, handleRemove }) {
    //esse remove está no onclick do botão
    const remove = (e) => {
        e.preventDefault();
        handleRemove(id);
    };
    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
      

            <p className={styles.category_text}>
                <span className={`${styles[category?.toLowerCase()]}`}></span>{" "}
                {category}
            </p>

            <div className={styles.project_card_actions}>
                <Link to={`/project/${id}`}>
                    <BsFillInfoCircleFill /> Info
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    );
}

export default ProjectCard;
