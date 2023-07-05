import api from "../utils/api";
import useFlashMessage from "./useFlashMessage";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {

    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const {setFlashMessage} = useFlashMessage();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true);
        }

    }, [])

    let msgText = 'Cadastro realizado com sucesso!';
    let msgType = 'success'

    async function register(user) {
        try {
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })
            await authUser(data);
        } catch (error) {
            msgText = error.response.data.message;
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    async function authUser(data) {

        setAuthenticated(true);

        localStorage.setItem('token', JSON.stringify(data.token));

        navigate('/home');
    }

    async function login(user) {
        let msgText = 'Login realizado com sucesso!';
        let msgType = 'success';

        try {
            const data = await api.post('/users/login', user).then((response) => {
                return response.data
            });

            await authUser(data);
        } catch (error) {
            msgText = error.response.data.message;
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType);
    }

    function logout() {
        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.Authorization = undefined;
        navigate('/signin')
    }

    return { authenticated, register, logout, login};
}