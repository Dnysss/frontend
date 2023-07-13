import { /* parse */ v4 as uuidv4 } from "uuid";

import styles from "./Project.module.css";

import api from "../../../utils/api";
import useFlashMessage from "../../../hooks/useFlashMessage";
import MessageValidation from "../../layout/message/MessageValidation";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../../layout/loading/Loading";
import Container from "../../layout/container/Container";
import ProjectForm from "../../project/project_form/ProjectForm";
import Message from "../../layout/message/Message";
import ServiceForm from "../../service/ServiceForm";
import ServiceCard from "../../service/ServiceCard";
import Input from "../../form/input/Input";

function Project() {
    const [card, setCards] = useState({});
    const [token] = useState(localStorage.getItem("token") || "");
    const { id } = useParams();
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        api.get(`/cards/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`,
        }).then((response) => {
            setCards(response.data.card);
        });
    }, [token, id]);

    async function updatedCard(card) {
        let msgType = "success";

        const formData = new FormData();

        await Object.keys(card).forEach((key) =>
            formData.append(key, card[key])
        );

        const data = await api
            .patch(`/cards/${card._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                msgType = "error";
                return err.response.data;
            });

        setFlashMessage(data.message, msgType);
    }


    return (
        <>
            <div className={styles.project_details}>
                <Container customClass="column">
                    <div className={styles.details_container}>
                        <h1>Card: {card.name}</h1>
                    </div>
                    <MessageValidation />
                    {card.name && (
                        <ProjectForm
                            handleSubmit={updatedCard}
                            btnText={"Atulizar"}
                            cardData={card}
                        />
                    )}
                    
                </Container>
            </div>
        </>
    );
}

export default Project;
