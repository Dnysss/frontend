import { Link } from "react-router-dom";

import { FaEnvelope, FaKey } from "react-icons/fa";
import { useState, useContext } from "react";

import { Context } from "../../../context/UserContext";
import MessageValidation from '../../layout/message/MessageValidation';


import styles from "./SignIn.module.css";

const SignIn = () => {
   const [user, setUser] = useState({});
   const {login} = useContext(Context);

   function handleOnChange (e) {
      setUser({...user, [e.target.name]: e.target.value})
      
   }
   function handleSubmit (e) {
      e.preventDefault();
      login(user);
   }

   return (
      <main className={styles.container_main}>
         <form id="login_form" className={styles.login_form } onSubmit={handleSubmit} >
            <div id="form_header" className={styles.form_header}>
               <h1>Sign in</h1>
            </div>
            
            <div id="inputs" className={styles.inputs}>
               <div className={styles.input_box}>
                  <label htmlFor="email">
                     E-mail
                     <div className={styles.input_field}>
                        <i className="envelope">
                           <FaEnvelope />
                        </i>
                        <input type="email" id="email" name="email" onChange={handleOnChange} />
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
                        <input type="password" id="password" name="password" onChange={handleOnChange} />
                     </div>
                  </label>
                  <div id="signup">
                     New to here?
                     <Link to="/"> Sign Up</Link>.
                  </div>
                  <div><MessageValidation /></div>
               </div>
            </div>

            <button type="submit" id="login_button" className={styles.login_button}>
               Login
            </button>
         </form>
      </main>
   );
};

export default SignIn;
