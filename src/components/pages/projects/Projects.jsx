//pagina que eu quero reaproveitar
import { useLocation } from "react-router-dom";

import Message from "../../layout/message/Message";

import style from "./Projects.module.css";

import Container from "../../layout/container/Container";
import Loading from "../../layout/loading/Loading";
import LinkButton from "../../layout/link_button/LinkButton";
import ProjectCard from "../../project/project_card/ProjectCard";
import { useState, useEffect } from "react";

function Projects() {
    //state para salvar os projetos
    const [projects, setProjects] = useState([]);
    //para remover os projetos
    const [removeLoading, setRemoveLoading] = useState(false);
    //para enviar msg de remoção
    const [projectMessage, setProjectMessage] = useState("");

    //resgatar a mensagem do arquivo NewProject
    const location = useLocation();
    let message = "";
    if (location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data);
                    setProjects(data);
                    setRemoveLoading(true);
                })
                .catch((err) => console.log(err));
        }, 300);
    }, []);

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then(() => {
                setProjects(projects.filter((project) => project.id !== id));
                //mensagem de remoção
                setProjectMessage("Projeto removido com sucesso!");
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className={style.project_container}>
            <div className={style.title_container}>
                <h1>Minhas Tarefas</h1>
                <LinkButton to="/newproject" text="Criar Card" />
            </div>
            {message && <Message type="sucess" msg={message} />}
            {projectMessage && <Message type="sucess" msg={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project?.category?.name}
                            key={project.id}
                            handleRemove={removeProject}
                        />
                    ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    );
}
//abaixo do h1
//<Message type="sucess" msg="alguma mensagem"/>
//{message && <Message type="sucess" msg={message}/>}
export default Projects;
