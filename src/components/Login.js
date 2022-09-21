import React from 'react'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

    let state = useLocation()
    // Tostify
    const notify = () => toast(state.state);
    if (state.state) {
        notify();
        state.state = "";
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordReset, setPasswordReset] = useState("")

    // Empty Field Checking Start
    const [EmailError, setEmailError] = useState("")
    const [PasswordError, setPasswordError] = useState("")
    const [passwordResetError, setPasswordResetError] = useState("")
    const [resetEmailCheck, setResetEmailCheck] = useState("")
    // Empty Field Checking End

    let flag = true;

    // Modal Open and Close Start
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // Modal Open and Close End
    let [speener, setSpeener] = useState(false)

    let navigate = useNavigate();
    const auth = getAuth();

    let handeleEmial = (e) => {
        setEmail(e.target.value)
    }
    let handlePassword = (e) => {
        setPassword(e.target.value)
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        if (!email) {
            setEmailError("Your Email Field is Empty")
            flag = false
        } else {
            setEmailError("")
        }

        if (!password) {
            setPasswordError("Your Password Field is Empty")
            flag = false
        } else if (password.length < 7) {
            setPasswordError("Your Password Must be Gratter Or Equel 8 Characters")
            flag = false
        } else {
            setPasswordError("")
        }

        if (flag) {
            setSpeener(true)
            signInWithEmailAndPassword(auth, email, password)
                .then((users) => {
                    // Signed in 
                    setSpeener(false)
                    navigate("/")
                    // ...
                })
                .catch((error) => {
                    setSpeener(false)
                    console.log(error.code);
                    toast.warn("Your Email Or Password is Incorrect");
                    setEmail("")
                    setPassword("")
                });
        }
    }

    // Password Reset Start 
    let handlePasswordReset = (e) => {
        setPasswordReset(e.target.value)
    }

    let handleResetPassword = () => {
        if (passwordReset) {
            setPasswordResetError()
            sendPasswordResetEmail(auth, passwordReset)
                .then(() => {
                    setResetEmailCheck("Please Check Your Email and Reset Password")
                })
                .catch((error) => {
                    console.log(error.code);
                    setPasswordResetError("Please Enter Correct Email Address")
                });
        } else {
            setPasswordResetError("Please Enter Email Address")
        }
    }
    // Password Reset End 

    return (
        <>
            <div className='registerPage'>
                <Container>
                    <ToastContainer />
                    <Row>
                        <Col xs={4} className='registerCol'>
                            <Card >
                                <Card.Body>
                                    <Card.Title>
                                        <h1 className='text-center'>Log In</h1>
                                        <hr></hr>
                                    </Card.Title>
                                    <Card.Text>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Emial Address</Form.Label>
                                                <Form.Control style={EmailError ? red : normal} onChange={handeleEmial} type="email" placeholder="Enter Email Address" value={email} />
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
                                                <Button onClick={handleSubmit} variant="success" type="submit">
                                                    Log In
                                                    {speener ?
                                                        <Spinner animation="border" variant="info" size="sm" />
                                                        : ""}
                                                </Button>
                                            </Form.Group>
                                        </Form>
                                        <p>Forgot Password <span className='resetPass text-danger' onClick={handleShow}>Click Here</span></p>
                                        you Don't have Account <Link to="/register">Register</Link>

                                        {/* Modal Open Start   */}
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Reset Password</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                {resetEmailCheck ? "Plase Check Your Email" :
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Control style={passwordResetError ? red : normal} onChange={handlePasswordReset} type="email" placeholder="Enter Email Address" />
                                                        {passwordResetError ? <samll className='text-danger'>{passwordResetError}</samll> : ""}
                                                    </Form.Group>
                                                }

                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={handleResetPassword}>
                                                    Password Rest
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        {/* Modal Open End   */}
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
export default Login