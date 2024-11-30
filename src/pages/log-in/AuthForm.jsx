import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useIsLoggedIn } from "../../config/IsLoggedIn";

const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const AuthForm = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();
    const { setIsLoggedIn } = useIsLoggedIn();
    const handleLogin = (signData) => {
        const makeLogin = async () => {
            try {
                const response = await fetch(
                    "https://watchy.up.railway.app/api/v1/auth/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(signData),
                    }
                );
                const data = await response.json();
                if (data.user) {
                    setIsLoggedIn(true);
                    navigate("/");
                } else {
                    alert("an error occurred");
                }
            } catch (err) {
                console.log(err);
            }
        };
        makeLogin();
    };

    const handleRegister = (regData) => {
        const makeRegister = async () => {
            try {
                const response = await fetch(
                    "https://watchy.up.railway.app/api/v1/auth/register",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(regData),
                    }
                );
                const data = await response.json();
                if (data.user) {
                    setIsLoggedIn(true);
                    navigate("/");
                } else {
                    alert("an error occurred");
                }
            } catch (err) {
                console.log(err);
            }
        };
        makeRegister();
    };

    return (
        <div className="auth-container">
            <div className="overlay"></div>
            <div className="auth-form-container">
                <div
                    className={`sliding-container ${
                        isRegistering ? "slide-left" : ""
                    }`}
                >
                    <div className="form-wrapper">
                        <div className="form-inner-wrapper">
                            <div className="signin-form">
                                <div className="form-content">
                                    <h2 className="form-title">Welcome Back</h2>
                                    <Formik
                                        initialValues={{
                                            email: "mockUser@gmail.com",
                                            password: "123456",
                                        }}
                                        validationSchema={SignInSchema}
                                        onSubmit={(
                                            values,
                                            { setSubmitting }
                                        ) => {
                                            console.log(values);
                                            handleLogin(values);
                                            setSubmitting(false);
                                        }}
                                    >
                                        {({ errors, touched }) => (
                                            <Form className="form">
                                                <div className="form-field">
                                                    <Field
                                                        name="email"
                                                        type="email"
                                                        placeholder="Email"
                                                        className="input-field"
                                                    />
                                                    {errors.email &&
                                                    touched.email ? (
                                                        <div className="error-message">
                                                            {errors.email}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="form-field">
                                                    <Field
                                                        name="password"
                                                        type="password"
                                                        placeholder="Password"
                                                        className="input-field"
                                                    />
                                                    {errors.password &&
                                                    touched.password ? (
                                                        <div className="error-message">
                                                            {errors.password}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="submit-button"
                                                >
                                                    Sign In
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>

                            <div className="signup-cta">
                                <div className="cta-content">
                                    <h2 className="cta-title">New Here?</h2>
                                    <p className="cta-text">
                                        Sign up and discover a great amount of
                                        new opportunities!
                                    </p>
                                    <button
                                        onClick={() => setIsRegistering(true)}
                                        className="cta-button"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`sliding-container ${
                        isRegistering ? "" : "slide-right"
                    }`}
                >
                    <div className="form-wrapper">
                        <div className="form-inner-wrapper">
                            <div className="signup-form">
                                <div className="form-content">
                                    <h2 className="form-title">
                                        Create Account
                                    </h2>
                                    <Formik
                                        initialValues={{
                                            name: "",
                                            email: "",
                                            password: "",
                                        }}
                                        validationSchema={RegisterSchema}
                                        onSubmit={(
                                            values,
                                            { setSubmitting }
                                        ) => {
                                            console.log(values);
                                            handleRegister(values);
                                            setSubmitting(false);
                                        }}
                                    >
                                        {({ errors, touched }) => (
                                            <Form className="form">
                                                <div className="form-field">
                                                    <Field
                                                        name="name"
                                                        type="text"
                                                        placeholder="Name"
                                                        className="input-field"
                                                    />
                                                    {errors.name &&
                                                    touched.name ? (
                                                        <div className="error-message">
                                                            {errors.name}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="form-field">
                                                    <Field
                                                        name="email"
                                                        type="email"
                                                        placeholder="Email"
                                                        className="input-field"
                                                    />
                                                    {errors.email &&
                                                    touched.email ? (
                                                        <div className="error-message">
                                                            {errors.email}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="form-field">
                                                    <Field
                                                        name="password"
                                                        type="password"
                                                        placeholder="Password"
                                                        className="input-field"
                                                    />
                                                    {errors.password &&
                                                    touched.password ? (
                                                        <div className="error-message">
                                                            {errors.password}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="submit-button"
                                                >
                                                    Sign Up
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>

                            <div className="signin-cta">
                                <div className="cta-content">
                                    <h2 className="cta-title">One of Us?</h2>
                                    <p className="cta-text">
                                        If you already have an account, just
                                        sign in. We've missed you!
                                    </p>
                                    <button
                                        onClick={() => setIsRegistering(false)}
                                        className="cta-button"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
