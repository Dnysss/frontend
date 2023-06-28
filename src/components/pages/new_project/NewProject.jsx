import { useNavigate } from "react-router-dom";

import ProjectForm from "../../project/project_form/ProjectForm";
import styles from "./NewProject.module.css";

function NewProject() {
    const history = useNavigate();

    function createPost(project) {
        //initialize cost and services
        project.cost = 0;
        project.services = [];

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                //redirect usando o history useNavigate
                history("/projects", {
                    state: { message: "Card criado com sucesso!" },
                });
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Card</h1>
            <p>Crie cards para adicionar suas tarefas</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar" />
        </div>
    );
}

export default NewProject;
