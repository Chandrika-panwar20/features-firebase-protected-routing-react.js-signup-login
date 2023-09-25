import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { Input } from "../../components"
import { validateName, validateEmail, validatePhone, validatePassword, validateConfirmPassword } from '../../handler'
import { singUpAuthantication, setUserData } from '../../firebase'
import './signUp.css'

export const SignUp = () => {
    const [fillFileds, setFillFiled] = useState("")
    const [firebaseErr, setFirebaseErr] = useState("")
    const [usersFormData, setUsersFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword: '',
        address: ''
    })
    const [errormassage, setErrorMassage] = useState({
        nameErr: "",
        emailErr: "",
        phoneErr: '',
        passwordErr: '',
        confirmPasswordErr: ''
    });

    const handleChange = (e) => {
        const { name, value } = e?.target;
        setUsersFormData({ ...usersFormData, [name]: value })
        if (name === "name") {
            const errName = validateName(value)
            setErrorMassage({ ...errormassage, nameErr: errName.name });
        }

        if (name === "email") {
            const errEmail = validateEmail(value)
            setErrorMassage({ ...errormassage, emailErr: errEmail.email });
        }

        if (name === "phone") {
            const errPhone = validatePhone(value)
            setErrorMassage({ ...errormassage, phoneErr: errPhone.phone });
        }

        if (name === "password") {
            const errPassword = validatePassword(value, usersFormData.confirmpassword)
            setErrorMassage({ ...errormassage, passwordErr: errPassword.password });
        }

        if (name === "confirmpassword") {
            // console.log("value......",value)
            const errConfirmPassword = validateConfirmPassword(value, usersFormData.password)
            setErrorMassage({ ...errormassage, confirmPasswordErr: errConfirmPassword.confirmPassword });
        }
    };

    const handleSubmit = (event) => {
      
        event.preventDefault()
        const { name, value } = event?.target;
        if(validateName(usersFormData.name).name===''&& validateEmail(usersFormData.email).email ==='' && validatePhone(usersFormData.phone).phone ===''
        && validatePassword(usersFormData.password).password ===''&&validateConfirmPassword(usersFormData.confirmpassword, usersFormData.password).confirmPassword ==='')
        { 
            console.log("api call")
            const userData = {
                name: usersFormData.name,
                email: usersFormData.email,
                phone: usersFormData.phone,
                address: usersFormData.address
            }
            singUpAuthantication(usersFormData.email, usersFormData.password)
                .then((userCredential) => {
                    if (userCredential) {
                        const userId = userCredential.user.uid
                        setUserData(userData, userId)
                        setTimeout(() => {
                            window.location.href = "/Dashboard"
                        }, 700)
                    }
                })
                .catch((error) => {
                    toast("email has already used");
                    console.error('Authentication error:', error.message);
                    setFirebaseErr("email has already used")
                });
        } else {
            setFillFiled("all fileds are mandatory to fill")
        }
        
    }
    return (
        <div className='signup-conatainer'>
            <div className='center-wrapper'>
                <div className='signup-wrapper'>
                    <div className='signup-content'>
                        <h2>Sign Up From</h2>
                        <form >
                            <div className='form-filed'>
                                <Input type="text" name="name" label="Full Name:"
                                    onChange={handleChange} value={usersFormData.name} errorMessage={errormassage.nameErr} />
                            </div>

                            <div className='form-filed'>
                                <Input type="email" name="email" label="Email Id:"
                                    onChange={handleChange} value={usersFormData.email} errorMessage={errormassage.emailErr} />
                            </div>

                            <div className='form-filed'>
                                <Input type="tel" name="phone" label="Phone No:"
                                    onChange={handleChange} value={usersFormData.phone} errorMessage={errormassage.phoneErr} />
                            </div>

                            <div className='form-filed'>
                                <Input type="password" name="password" label="Password:"
                                    onChange={handleChange} value={usersFormData.password} errorMessage={errormassage.passwordErr} />
                            </div>

                            <div className='form-filed'>
                                <Input type="password" name="confirmpassword" label="confirm-password:"
                                    onChange={handleChange} value={usersFormData.confirmpassword} errorMessage={errormassage.confirmPasswordErr} />
                            </div>

                            <div className='form-filed'>
                                <Input type="text" name="address" label="Address:"
                                    onChange={handleChange} />
                            </div>
                            
                            <div className='form-filed signup-error'>
                                <p>{fillFileds}</p>
                            </div>

                            <div className='signup-error' >
                                <p>{firebaseErr}</p>
                            </div>

                            <div className='form-filed'>
                                <Input type="submit" onClick={handleSubmit} value="signup" />
                            </div>
                              
                               <ToastContainer/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}