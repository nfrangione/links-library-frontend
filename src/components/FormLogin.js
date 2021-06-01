import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const FormLogin = ({loginUser}) => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({})
    const [submit, setSubmit] = useState(false)

    let loginSubmission = {
        username: username,
        password: password,
    }

    const handleLogin = (e) => {
        e.preventDefault()
        setErrors(validateLogin(loginSubmission))
        setSubmit(true)
    }

    const validateLogin = (loginSubmission) => {
        let errors = {}
        if(!loginSubmission.username.trim()) {
            errors.username = "Username required"
        }
        if(!loginSubmission.password) {
            errors.password = 'Password is required'
        } 
        return errors
    }

    useEffect(() => {
        if(Object.keys(errors).length === 0 && submit){
          loginUser(loginSubmission)  
        } 
    }, [errors, submit])
  
    
    
    return (
        <div className="register-container">
            <div><h2>Login:</h2>
                <form className="validate-form" onSubmit={handleLogin}> 
                    <label htmlFor="username">Username: {errors.username && <span className="error-message">{errors.username}</span>}</label><br/>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        /><br/><br/>
                    <label htmlFor="password">Password: {errors.password && <span className="error-message">{errors.password}</span>}</label><br/>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    <p className="forgot-password text-right">
                    No account? <Link to="/register">Register Here</Link>
                    </p>
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
}

export default FormLogin