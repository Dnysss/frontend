import { /* parse */ v4 as uuidv4 } from "uuid";

import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../../layout/loading/Loading";
import Container from "../../layout/container/Container";
import ProjectForm from "../../project/project_form/ProjectForm";
import Message from "../../layout/message/Message";
import ServiceForm from "../../service/ServiceForm";
import ServiceCard from "../../service/ServiceCard";

function Project() {
    const { id } = useParams();

    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data);
                    setServices(data.services);
                })
                .catch((err) => console.log(err));
        }, 300);
    }, [id]);

    //edição do projeto
    function editPost(project) {
        setMessage("");
        //validação
        if (project.budget < project.costs) {
            //mensagem
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                setShowProjectForm(false);
                setMessage("Tarefa atualizada!");
                setType("sucess");
            })
            .catch();
    }
    //add tarefa
    function createService(project) {
        const lastService = project.services[project.services.length - 1];

        lastService.id = uuidv4();

        setMessage("");
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then(() => {
                //exibir tarefa
                setShowServiceForm(false);
            })
            .catch((err) => console.log(err));
    }

    function removeService(id) {
        const serviceUpdated = project.services.filter(
            (service) => service.id !== id
        );

        const projectUpdated = project;

        projectUpdated.services = serviceUpdated;

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectUpdated),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(projectUpdated);
                setServices(serviceUpdated);
                setMessage("Tarefa removido com sucesso!");
                setType("sucess");
            })
            .catch((err) => console.log(err));
    }

    //cria a função pra chamar a const do botaão editar e fechar
    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Card: {project.name}</h1>
                            <button
                                className={styles.btn}
                                onClick={toggleProjectForm}
                            >
                                {!showProjectForm ? "Editar tarefa" : "Fechar"}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span>{" "}
                                        {project.category.name}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Concluir edição"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione tarefas na lista:</h2>
                            <button
                                className={styles.btn}
                                onClick={toggleServiceForm}
                            >
                                {!showServiceForm
                                    ? "Adicionar tarefa"
                                    : "Fechar"}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar tarefa"
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Lista de tarefas</h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        description={service.description}
                                        key={service.id}
                                        hendleRemove={removeService}
                                    />
                                ))}
                            {services.length === 0 && (
                                <p>Não há tarefas na lista.</p>
                            )}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Project;
