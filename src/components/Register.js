import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Col, Container, Row, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import firebaseConfig from '../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    let [speener, setSpeener] = useState(false)

    let navigate = useNavigate();

    // Empty Field Checking Start
    const [usernameError, setUsernameError] = useState("")
    const [EmailError, setEmailError] = useState("")
    const [PasswordError, setPasswordError] = useState("")
    const [cPasswordError, setCpasswordError] = useState("")
    const [errorExits, setErrorExits] = useState("")
    // Empty Field Checking End
    let flag = true;

    let handleuser = (e) => {
        setUsername(e.target.value);
    }
    let handeleEmial = (e) => {
        setEmail(e.target.value)
    }
    let handlePassword = (e) => {
        setPassword(e.target.value)
    }
    let handleConfirmPassword = (e) => {
        setCpassword(e.target.value)
    }

    let handleSubmit = (e) => {
        e.preventDefault()

        if (!username) {
            setUsernameError("Your User Name Field is Empty")
            flag = false;
        } else {
            setUsernameError("")
        }

        if (!email) {
            setEmailError("Your Email Field is Empty")
            flag = false;
        } else {
            setEmailError("")
        }

        if (!password) {
            setPasswordError("Your Password Field is Empty")
            flag = false;
        } else if (password.length < 7) {
            setPasswordError("Your Password Must be Gratter Or Equel 8 Characters")
            flag = false;
        } else {
            setPasswordError("")
        }

        if (!cpassword) {
            setCpasswordError("Your Confirm  Password Field is Empty")
            flag = false;
        } else if (password != cpassword) {
            setCpasswordError("Your Confirm  Password Not Match With Password")
            flag = false;
        } else {
            setCpasswordError("")
        }
        if (flag) {
            setSpeener(true)
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((users) => {
                    // Signed in 
                    setSpeener(false)
                    setUsername("")
                    setEmail("")
                    setPassword("")
                    setCpassword("")
                    navigate("/login", { state: "Your Accout Createde Successfully. Now Log In" })
                    const email = users.username;
                    sendEmailVerification(email)
                    // ...
                })
                .catch((error) => {
                    setSpeener(false)
                    error = error.code;
                    if (error.includes("auth/email-already-in-use")) {
                        setErrorExits("This Email Address Already been Taken")
                        setEmail("")
                    }
                });
        }
    }

    return (
        <>
            <div className='registerPage'>
                <Container>
                    <Row>
                        <Col xs={4} className='registerCol'>
                            {errorExits ? <Alert variant="danger" className='text-danger'>{errorExits}</Alert> : ""}
                            <Card >
                                <Card.Body>
                                    <Card.Title>
                                        <h1 className='text-center'>Register</h1>
                                        <hr></hr>
                                    </Card.Title>
                                    <Card.Text>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>User Name</Form.Label>
                                                <Form.Control style={usernameError ? red : normal} onChange={handleuser} type="text" placeholder="Enter User Name" value={username} />
                                                {usernameError ?
                                                    <Form.Text className="text-danger">
                                                        {usernameError}
                                                    </Form.Text>
                                                    : ""}
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Emial Address</Form.Label>
                                                <Form.Control style={EmailError || errorExits ? red : normal}
                                                    onChange={handeleEmial} type="email" placeholder="Enter Email Address" value={email} />
                                                {EmailError ?
                                                    <Form.Text className="text-danger">
                                                        {EmailError}
                                                    </Form.Text>
                                                    : ""}
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control style={PasswordError ? red : normal} onChange={handlePassword} type="password" placeholder="Password" value={password} />
                                                {PasswordError ?
                                                    <Form.Text className="text-danger">
                                                        {PasswordError}
                                                    </Form.Text>
                                                    : ""}
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control style={cPasswordError ? red : normal} onChange={handleConfirmPassword} type="password" placeholder="Password" value={cpassword} />
                                                {cPasswordError ?
                                                    <Form.Text className="text-danger">
                                                        {cPasswordError}
                                                    </Form.Text>
                                                    : ""}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Button onClick={handleSubmit} variant="primary" type="submit">
                                                    Register
                                                    {speener ?
                                                        <Spinner animation="border" variant="danger" size="sm" />
                                                        : ""}
                                                </Button>
                                            </Form.Group>
                                        </Form>
                                        Do you have Alrady Account <Link to="/login">Log In</Link>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    )
}

let red = {
    border: '1px solid red'
}
let normal = {
    border: '1px solid #ced4da'
}

export default Register