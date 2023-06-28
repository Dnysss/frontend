import { Link } from "react-router-dom";


import { RiInstagramFill } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { useState } from "react";

import axios from "axios";

import "./SignIn.css";

const SingIn = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   //Config mesages
   //const [msg, setMsg] = useState("");
   const [error, setError] = useState("");

   function handleSubmit(e) {
      e.preventDefault();

      console.log(email, password);
      axios
         .post("http://localhost:3000/auth/login", {
            email,
            password,
         })
         .then((response) => {
            console.log(response);
            window.location.href = '/home'
            //alert('login successful!')

            //setMsg(response.data.msg);
         })
         .catch((error) => {
            console.log(error);
            setError(error.response.data.msg);
         });

      //imprimir a messagem de autenticação ou de erro no form
   }
   return (
      <main className="container">
         <form id="login_form" className="dark" onSubmit={handleSubmit}>
            <div id="form_header">
               <h1>Sign in</h1>
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
                  <label htmlFor="email">
                     E-mail
                     <div className="input-field">
                        <i className="envelope">
                           <FaEnvelope />
                        </i>
                        <input
                           type="email"
                           id="email"
                           name="email"
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </div>
                  </label>
               </div>

               <div className="input-box">
                  <label htmlFor="password">
                     Password
                     <div className="input-field">
                        <i className="key">
                           <FaKey />
                        </i>
                        <input
                           type="password"
                           id="password"
                           name="password"
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </div>
                  </label>
                  <div id="singup">
                     New to here?
                     <Link to="/singUp"> Sign Up</Link>.
                  </div>

                  <p className="text-danger">{error}</p>
               </div>
            </div>

            <button type="submit" id="login_button">
               Login
            </button>
         </form>
      </main>
   );
};

export default SingIn;
