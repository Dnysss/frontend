import { useState } from 'react';

//importação do link para as rotas
import { Link } from "react-router-dom";

//importção dos icons
import { RiInstagramFill } from 'react-icons/ri';
import { BsLinkedin } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';
import { FaUser, FaEnvelope, FaKey  } from 'react-icons/fa';

//importação do axios
import axios from 'axios';

import './SignUp.css';


const SingUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    function handleSubmit (e) {
        e.preventDefault();

        console.log(name, email, password, confirmPassword);
        axios.post('http://localhost:3000/auth/register', {
            name,
            email,
            password,
            confirmPassword,
        })
        .then(response => {
            console.log(response);
            alert("sing up successful!")// "Usuário registrado com sucesso"
        })
        .catch(error => {
            console.error(error);
            setError(error.response.data.msg);
        });
        
    }

    return (
        <main className="container">
            <form id="login_form" className="dark" onSubmit={handleSubmit}>
                <div id="form_header">
                    <h1>Sign up</h1>
                    <i id="mode_icon" className="fa-solid fa-moon"></i>
        
                </div>

                <div id="social_midia">
                    <a href="#" className="linkedin">
                        <BsLinkedin />
                    </a>
                    <a href="#" className="gmail">
                        <SiGmail />
                    </a>
                    <a href="#" className="instagram">
                        <RiInstagramFill />
                    </a>
                </div>

                <div id="inputs">
                    <div className="input-box">
                        <label htmlFor="name">
                            Name
                            <div className="input-field">
                                <i className="user"><FaUser /></i>
                                <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} />
                            </div>
                        </label>
                    </div>

                    <div className="input-box">
                        <label htmlFor="email">
                            E-mail
                            <div className="input-field">
                                <i className="envelope"><FaEnvelope /></i>
                                <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </label>
                    </div>

                    <div className="input-box">
                        <label htmlFor="password">
                            Password
                            <div className="input-field">
                                <i className="key"><FaKey /></i>
                                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </label>
                        <label htmlFor="confirm-password">
                            Confirm Password
                            <div className="input-field">
                                <input type="password" id="confirm-password" name="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                        </label>
                        <div id="signup">
                            <Link to="/">Sign In</Link>
                        </div>
                        <p className="text-danger">{error}</p>
                    </div>

                </div>

                <button type="submit" id="login_button">
                    Sign Up
                </button>
            </form>
        </main>
        
    )
}

export default SingUp;
