import { useContext, useEffect, useState } from 'react';

import { FaUser, FaEnvelope, FaKey  } from 'react-icons/fa';

import api from '../../../utils/api';
import MessageValidation from '../../layout/message/MessageValidation';
import useFlashMessage from '../../../hooks/useFlashMessage';
import RoundedImage from '../../layout/profile/RoundedImage';
import styles from './Profile.module.css';

const Profile = () => {

    const [user, setUser] = useState({});
    const [preview, setPreview] = useState();
    const [token] = useState(localStorage.getItem('token') || '');
    const {setFlashMessage} = useFlashMessage()

    useEffect(() =>{
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setUser(response.data)
        })

    }, [token])

    function handleOnChange (e) {
        setUser({...user, [e.target.name]: e.target.value})
        
    }

    function onFileChange (e) {
        setPreview(e.target.files[0])
        setUser({...user, [e.target.name]: e.target.files[0]})
    }

    async function handleSubmit (e) {
        e.preventDefault();
        
        let msgType = 'success';

        const formData = new FormData();

        const userFormData = await Object.keys(user).forEach((key) =>
            formData.append(key, user[key])
        )

        const data = await api.patch(`/users/edit/${user._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType);
    }
    return (
        <section className={styles.container_section}>
            <form className={styles.login_form} id="login_form" onSubmit={handleSubmit}>
                <div className={styles.form_header}>
                    <h1>Profile</h1>
                    {(user.image || preview) && (
                        <RoundedImage src={preview ? URL.createObjectURL(preview) : `http://localhost:5000/imgs/users/${user.image}`} alt={user.name} />
                    )}
                </div>
                <label htmlFor="image">
                    <div className={styles.input_field}>
                        <input text="Image" type="file" name="image" onChange={onFileChange} />
                    </div>
                </label>

                <div className={styles.inputs}>
                    <div className={styles.input_box}>
                        <label htmlFor="name">
                            Name
                            <div className={styles.input_field}>
                                <i className="user"><FaUser /></i>
                                <input type="text" id="name" name="name" onChange={handleOnChange} value={user.name || '' } pattern="[A-Za-z]+" />
                            </div>
                        </label>
                    </div>

                    <div className={styles.input_box}>
                        <label htmlFor="email">
                            E-mail
                            <div className={styles.input_field}>
                                <i className="envelope"><FaEnvelope /></i>
                                <input type="email" id="email" name="email" onChange={handleOnChange} value={user.email || ''} />
                            </div>
                        </label>
                    </div>

                    <div className={styles.input_box}>
                        <label htmlFor="password">
                            Password
                            <div className={styles.input_field}>
                                <i className="key"><FaKey /></i>
                                <input type="password" id="password" name="password" onChange={handleOnChange} />
                            </div>
                        </label>
                        <label htmlFor="confirm-password">
                            Confirm Password
                            <div className={styles.input_field}>
                                <input type="password" name="confirmpassword" onChange={handleOnChange} />
                            </div>
                        </label>
                        <div><MessageValidation /></div>
                    </div>

                </div>

                <button className={styles.login_button}type="submit" id="login_button">
                    Editar Perfil
                </button>
            </form>
        </section>
        
    )
}

export default Profile;
