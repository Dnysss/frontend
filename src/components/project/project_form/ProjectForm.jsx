import { useEffect, useState } from "react";

import Input from "../../form/input/Input";
import InputDescription from "../../form/input/InputDescription";
import Select from "../../form/select/Select";
import SubmitButton from "../../form/submitButton/SubmitButton";
import styles from "./ProjectForm.module.css";

function ProjectForm({ handleSubmit, btnText, cardData }) {
    const [card, setCard] = useState(cardData || {});
    const category = ["Saúde", "Desenvolvimento", "Design", "Planejamento"];

    function handleOnChange(e) {
        setCard({ ...card, [e.target.name]: e.target.value });
    }

    function handleDescription(e) {
        setCard({ ...card, description: e.target.value });
    }

    function handleCategory(e) {
        setCard({
            ...card,
            category: e.target.options[e.target.selectedIndex].text,
        });
    }

    function submit(e) {
        e.preventDefault();
        handleSubmit(card);
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome da tarefa"
                name="name"
                placeholder="Insira o nome da tarefa"
                handleOnChange={handleOnChange}
                value={card.name || ""}
            />

            <InputDescription
                type="text"
                text="Descrição"
                placeholder="Insira a descrição"
                handleOnChange={handleDescription}
                value={card.description || ""}
            />

            <Select
                name="category"
                text="Selecione a categoria"
                options={category}
                handleOnChange={handleCategory}
                value={card.category || ""}
            />
            <SubmitButton text={btnText} />
        </form>
    );
}

export default ProjectForm;
