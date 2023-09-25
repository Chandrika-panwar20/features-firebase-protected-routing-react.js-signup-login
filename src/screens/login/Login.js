import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { loginAuthantication } from '../../firebase'
import { Input } from "../../components"
import { validateEmail, validatePassword } from '../../handler'
export const Login = () => {
    const [usersFormData, setUsersFormData] = useState({
        email: '',
        password: '',
    })
    const [errorMessage, setErrorMessages] = useState({
        emailErr: '',
        passwordErr: '',

    })
    console.log("errorMessage.passwordErr", errorMessage.passwordErr)
    // console.log("errorMessage.emailErr", errorMessage.emailErr)


    const handleChange = (e) => {
        // setUsersFormData( { ...usersFormData, [e.target.name]: e.target.value } );

        const { name, value } = e?.target;
        setUsersFormData({ ...usersFormData, [name]: value })
        if (name === "email") {
            const errEmail = validateEmail(value)
            setErrorMessages({ ...errorMessage, emailErr: [errEmail.email] });
        }
        if (name === "password") {
            const errPassword = validatePassword(value)
            // console.log("errPassword", errPassword.password)
            setErrorMessages({ ...errorMessage, passwordErr: errPassword.password });
        }
        // console.log("validateEmail", validateEmail())
        // console.log("validatePassword",validatePassword())
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if ( validateEmail(usersFormData.email).email ==='' &&  validatePassword(usersFormData.password).password ==='') {
            loginAuthantication(usersFormData.email, usersFormData.password)
                .then((response) => {
                    if (response === usersFormData.email) {
                        window.location.href = "/Dashboard"
                    }
                })
                .catch((error) => {
                    toast("user credentials are wrong");
                    if (error.code === 'auth/user-not-found') {
                        setErrorMessages({ ...errorMessage, emailErr: "*User email id is wrong"})
                    } 
                        else {
                        setErrorMessages({ ...errorMessage, passwordErr: error.code })
                    }
                })
        } else {
               console.log("All fileds required to fill")
            // setErrorMessages({ ...errorMessage, passwordErr: "All fileds required to fill" })
        }
    }
    return (
        <div>
            <div className='signup-conatainer'>
                <div className='center-wrapper'>
                    <div className='signup-wrapper'>
                        <div className='signup-content'>
                           
                            <h2>Login From</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='form-filed'>
                                    <Input type="email" name="email" label="Email Id:" onChange={handleChange} errorMessage={errorMessage.emailErr} />
                                </div>

                                <div className='form-filed'>
                                    <Input type="password" name="password" label="Password:" onChange={handleChange} errorMessage={errorMessage.passwordErr} />
                                </div>

                                <div className='form-filed'>
                                    <Input type="submit" value="login" />
                                </div>

                                <div className='form-filed'>
                                    <span>If you are not signup <Link to="/"> SignUp </Link></span>
                                </div> 
                                <ToastContainer/>
                                <div className='form-filed'>
                                    <p></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
