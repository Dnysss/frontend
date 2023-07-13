//pagina que eu quero reaproveitar
import { useLocation } from "react-router-dom";

import Message from "../../layout/message/Message";
import MessageValidation from "../../layout/message/MessageValidation";
import useFlashMessage from "../../../hooks/useFlashMessage";

import api from "../../../utils/api";

import style from "./Projects.module.css";

import Container from "../../layout/container/Container";
import Loading from "../../layout/loading/Loading";
import LinkButton from "../../layout/link_button/LinkButton";
import ProjectCard from "../../project/project_card/ProjectCard";
import { useState, useEffect } from "react";

function Projects() {
    const [cards, setCards] = useState([]);
    const [token] = useState(localStorage.getItem("token") || "");
    const { setFlashMessage } = useFlashMessage();
    const [removeLoading, setRemoveLoading] = useState(false);

    /* const [projectMessage, setProjectMessage] = useState(""); */

    useEffect(() => {
        api.get("/cards/mycards", {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => {
            setCards(response.data.cards);
            setRemoveLoading(true);
        });
    }, [token]);

    async function removeCard(id) {
        let msgType = "success";

        const data = await api
            .delete(`/cards/${id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            .then((response) => {
                //atulização do card removido no front
                const updateCards = cards.filter((card) => card._id != id);
                setCards(updateCards);

                return response.data;
            })
            .catch((err) => {
                msgType = "error";
                return err.response.data;
            });

        setFlashMessage(data.message, msgType);
    }

    return (
        <div className={style.project_container}>
            <div className={style.title_container}>
                <h1>Minhas Tarefas</h1>
                <MessageValidation />
                <LinkButton to="/newproject" text="Criar Card" />
            </div>
            <Container customClass="start">
                {cards.length > 0 &&
                    cards.map((card) => (
                        <div key={card._id}>
                            <ProjectCard
                                id={card._id}
                                name={card.name}
                                category={card.category}
                                handleRemove={() => {
                                    removeCard(card._id);
                                }}
                            />
                            {/* <button onClick={() => {removeCard(id._id)}}></button> */}
                        </div>
                    ))}
                {!removeLoading && <Loading />}
                {removeLoading && cards.length === 0 && <p>Não há cards.</p>}
            </Container>
        </div>
    );
}
//abaixo do h1
//<Message type="sucess" msg="alguma mensagem"/>
//{message && <Message type="sucess" msg={message}/>}
export default Projects;
