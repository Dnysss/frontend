import { useContext, useState } from "react";

//importação do link para as rotas
import { Link } from "react-router-dom";

//importção dos icons

import { FaUser, FaEnvelope, FaKey } from "react-icons/fa";

//context
import { Context } from "../../../context/UserContext";

import MessageValidation from "../../layout/message/MessageValidation";

import styles from "./SignUp.module.css";

const SignUp = () => {
    const [user, setUser] = useState({});
    const { register } = useContext(Context);

    function handleOnChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        register(user);
    }

    return (
        <main className={styles.container_main}>
            <form
                className={styles.login_form}
                id="login_form"
                onSubmit={handleSubmit}
            >
                <div className={styles.form_header}>
                    <h1>Sign up</h1>
                </div>

                <div className={styles.inputs}>
                    <div className={styles.input_box}>
                        <label htmlFor="name">
                            Name
                            <div className={styles.input_field}>
                                <i className="user">
                                    <FaUser />
                                </i>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={handleOnChange}
                                    pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$"
                                />
                            </div>
                        </label>
                    </div>

                    <div className={styles.input_box}>
                        <label htmlFor="email">
                            E-mail
                            <div className={styles.input_field}>
                                <i className="envelope">
                                    <FaEnvelope />
                                </i>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={handleOnChange}
                                />
                            </div>
                        </label>
                    </div>

                    <div className={styles.input_box}>
                        <label htmlFor="password">
                            Password
                            <div className={styles.input_field}>
                                <i className="key">
                                    <FaKey />
                                </i>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={handleOnChange}
                                />
                            </div>
                        </label>
                        <label htmlFor="confirm-password">
                            Confirm Password
                            <div className={styles.input_field}>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    name="confirmpassword"
                                    onChange={handleOnChange}
                                />
                            </div>
                        </label>
                        <div className={styles.signup}>
                            <p>
                                <Link to="/signin">Sign In</Link>
                            </p>
                        </div>
                        <div>
                            <MessageValidation />
                        </div>
                    </div>
                </div>

                <button
                    className={styles.login_button}
                    type="submit"
                    id="login_button"
                >
                    Sign Up
                </button>
            </form>
        </main>
    );
};

export default SignUp;
