import React, { useState } from 'react';
import './form.css';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';

export default function Login({turnOffModal}){
    const [loginDetails, setLoginDetails] = useState({
        name: "",
        password: "",
    });

    

    const onFormSubmitted = async (e) => {
        e.preventDefault();
        const params = "Basic " + window.btoa(`${name}:${password}`);
        console.log(`${name}:${password}` + ":" + params );

        const header_details = {"Accept": "application/json",
                                "Content-Type": "application/json;charset=UTF-8",
                                "authorization" : params}

        console.log(header_details);

        try{
            
            turnOffModal(false);
            const rawResponse = await fetch('/api/v1/auth/login', {
                method : 'POST',
                header : header_details
            });
            const response = await rawResponse.json();

            if (rawResponse.ok){
                console.log("2: Reached Here!!!!")
                //history.push("/");
            } else {
                const error = new Error();
                error.message = response.message || "Something went wrong";
                throw error;
            }
        } catch (e){
            console.log(`Error : ${e.message}`);
        }

        //addSubscriberHandler(addSubscriberFrom);
        //setAddSubscriberForm({id:0, name:'', phone:''});
        //history.push("/"); // or history.goBack()
    }

    const inputChangedHandler= (e) => {
        const state = loginDetails;
        state[e.target.name] = e.target.value;
        setLoginDetails({...state});

    }

    const {name, password} = loginDetails;
    
    return(
        <ValidatorForm className="login-form" onSubmit={onFormSubmitted}>
            <TextValidator  id="name" 
                                    className='input-control' 
                                    label='Username *'
                                    type='text'  
                                    name='name'
                                    value={name}
                                    onChange={inputChangedHandler} 
                                    validators={['required']}
                                    errorMessages={['Name cannot be empty']}
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
                                    errorMessages={['Password cannot be empty']}
            ></TextValidator>   
            <br />
            {/* <button type="submit" className='button'>Login</button> */}
            <Button className="button" type="submit" variant="contained" color="primary">Login</Button>                          
        </ValidatorForm>
    )
}