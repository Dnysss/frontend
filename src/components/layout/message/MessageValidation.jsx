import { useState, useEffect } from "react";
import styles from "./MessageValidation.module.css";

import bus from "../../../utils/bus";

function MessageValidation() {
    //altera a visibilidade da menssagem
    const [type, setType] = useState("");
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('')

    useEffect(() => {
        bus.addListener('flash', ({message, type})=> {
            setVisible(true);
            setMessage(message);
            setType(type);

            setTimeout(() => {
                setVisible(false)
            }, 3000)

        })
    }, []);

    return (
        visible && (
            <div className={`${styles.message} ${styles[type]}`}>{message}</div>
        )
    );
}

export default MessageValidation;