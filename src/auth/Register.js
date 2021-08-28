import React, { useState } from 'react';
import './form.css';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';

export default function Register(){

    const [registerDetails, setRegisterDetails] = useState({
        fname : "",
        lname : "",
        email : "",
        password: "",
        phone: ""
    })

    const [message, setMessage] = useState("");

    const inputChangedHandler= (e) => {
        const state = registerDetails;
        state[e.target.name] = e.target.value;
        setRegisterDetails({...state});
    }

    async function onFormSubmitted(e){
        e.preventDefault();
        const body = {
                "email_address": email,
                "first_name": fname,
                "last_name": lname,
                "mobile_number": phone,
                "password": password
              };


        try{
            const rawResponse = await fetch('/api/v1/signup', {
                body: JSON.stringify(body),
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8" 
                }
            });

            const response = await rawResponse.json();

            if (rawResponse.ok){
                setMessage("Registration Successful. Please Login!!");
            } else {
                const error = new Error();
                error.message = response.message || "Something went wrong";
                throw error;
            }
        } catch (e){
            console.log(`Error : ${e.message}`);
        }    
    }

    const {fname, lname, email, password, phone} = registerDetails;

    return(
        <ValidatorForm className="login-form" onSubmit={onFormSubmitted}>
            <TextValidator  id="fname" 
                            className='input-control' 
                            label='First Name *'
                            type='text'  
                            name='fname' 
                            value={fname} 
                            onChange={inputChangedHandler}
                            validators={['required']}
                            errorMessages={['required']}
            ></TextValidator> 
            <br />
            <TextValidator  id="lname" 
                            className='input-control' 
                            label="Last Name *"
                            type='text'  
                            name='lname'
                            value={lname} 
                            onChange={inputChangedHandler} 
                            validators={['required']}
                            errorMessages={['required']}
            ></TextValidator>
            <br />
            <TextValidator  id="Email" 
                            className='input-control' 
                            label="Email *"
                            type='email'  
                            name='email' 
                            value={email} 
                            onChange={inputChangedHandler}
                            validators={['required','isEmail']}
                            errorMessages={['required']}
            ></TextValidator>
            <br />
            <TextValidator  id="password" 
                            className='input-control' 
                            label="Password *"
                            type='password'  
                            name='password' 
                            value={password} 
                            onChange={inputChangedHandler}
                            validators={['required']}
                            errorMessages={['required']}
            ></TextValidator>
            <br />
            <TextValidator  id="phone" 
                            className='input-control' 
                            label="Contact No *"
                            type='text'  
                            name='phone' 
                            value={phone} 
                            onChange={inputChangedHandler}
                            validators={['required']}
                            errorMessages={['required']}
            ></TextValidator>   
            <br />
            <div className="messageConatiner">{message}</div>
            {/* <button type="submit" className='button'>Register</button>                         */}
            <Button className="button" type="submit" variant="contained" color="primary">Register</Button>   
        </ValidatorForm>
    )
}