import React from 'react';
import { useHistory } from 'react-router-dom'

const Login = () => {
    const history = useHistory()

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const inputEmail = event.target.inputEmail.value
        const inputPassword = event.target.inputPassword.value

        await fetch('/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: inputEmail, password: inputPassword })
        })
            .then(response => {
                // Upon successful login, return to the the page that triggered the login
                history.go(history.location.pathname)
            }).catch(err => {
                console.log(err)
            }
            )


    }

    return (
        <form onSubmit={handleFormSubmit} className="form-signin" style={{ maxWidth: '300px', margin: "100px auto" }}>
            <h1 className="h3 mb-3 font-weight-normal">Welcome!</h1>
            <label htmlFor="inputEmail" className="sr-only"></label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" />
            <label htmlFor="inputPassword" className="sr-only"></label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />

            <button className="btn btn-lg  btn-block" style={{ marginTop: "2rem", color: "white", backgroundColor: " var(--main-theme-color)" }} type="submit">Sign in</button>
        </form>
    );
};

export default Login;