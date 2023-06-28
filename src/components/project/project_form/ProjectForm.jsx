import { useEffect, useState } from "react";

import Input from "../../form/input/Input";
import Select from "../../form/select/Select";
import SubmitButton from "../../form/submitButton/SubmitButton";
import styles from "./ProjectForm.module.css";

function ProjectForm({ handleSubmit, btnText, projectData }) {
    const [project, setProject] = useState(projectData || {});

    const [categories, setCategories] = useState([]);

    //API
    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => console.log(err));
    }, []);

    //não recarregar a pagina e dar um submit
    const submit = (e) => {
        e.preventDefault();
        //console.log(project);
        handleSubmit(project);
    };
    //valores do nome do projeto
    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value });
        console.log(project);
    }

    //category
    function handleCategory(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        });
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome da tarefa"
                name="name"
                placeholder="Insira o nome da tarefa"
                handleOnChange={handleChange}
                value={project.name ? project.name : ""}
            />
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ""}
            />
            <SubmitButton text={btnText} />
        </form>
    );
}

export default ProjectForm;
