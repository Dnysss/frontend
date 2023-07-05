import { useNavigate } from "react-router-dom";
import { useState } from "react";

import api from "../../../utils/api";
import ProjectForm from "../../project/project_form/ProjectForm";
import styles from "./NewProject.module.css";
import useFlashMessage from "../../../hooks/useFlashMessage";
import MessageValidation from "../../layout/message/MessageValidation";

function NewProject() {
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage();
    const navigate = useNavigate()

    async function addCard(card) {
        let msgType = 'success';

        const formData = new FormData();

        await Object.keys(card).forEach((key) =>
            formData.append(key, card[key])
        )
        const data = await api.post('/cards/create', formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType);
        
        if(msgType !== 'error') {
            navigate('/projects')
        }
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Card</h1>
            <p>Crie cards para adicionar suas tarefas!</p>
            <ProjectForm handleSubmit={addCard} btnText="Criar" />
            <MessageValidation />
        </div>
    );
}

export default NewProject;
