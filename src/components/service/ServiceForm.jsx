import { useState } from "react";

import Input from "../form/input/Input";
import SubmitButton from "../form/submitButton/SubmitButton";

import style from "../project/project_form/ProjectForm";

function ServiceForm({ handleSubmit, btnText, projectData }) {
    const [list, setList] = useState(projectData || {});

    function submit(e) {
        e.preventDefault();
        /* projectData.list.push(list); */
        handleSubmit(list);
    }

    function handleOnChange(e) {
        setList({ ...list, [e.target.name]: e.target.value });
    }
    return (
        <form onSubmit={submit} className={style.form}>
            <Input
                type="text"
                text="Nome da task"
                name="name"
                placeholder="Digite o nome da tarefa"
                handleOnChange={handleOnChange}
                value={list.name || ''}
            />
            <Input
                type="text"
                text="Descrição"
                name="description"
                placeholder="Digite uma descrição(opcional)"
                handleOnChange={handleOnChange}
            />
            <SubmitButton text={btnText} />
        </form>
    );
}

export default ServiceForm;
