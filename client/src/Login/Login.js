import React, { useState } from "react";
import { useHistory} from "react-router-dom";

import styles from "./Login.css";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import config from "../config";
import axios from "axios";


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState();
  const history = useHistory();

  const onSubmit = (data, e) => {
    setMessage({
      data: "Login is in progress...",
      type: "alert-warning",
    });
    axios.post(`http://localhost:4006/user/login`, {
    data
    })
    .then((response) => {
      console.log(response.data)
      const hasError = response.data.error != null;
      setMessage({
        data: hasError ?"Login failed" : "Logged in successfully, redirecting...",
        type: hasError ? "alert-danger" : "alert-success",
      });
      !hasError &&
        setTimeout(() => {
          sessionStorage.setItem("authtoken", response.data.authtoken);
          history.push("/home");
        }, 3000);
      },
      (error) => {
        setMessage({
          data: error,
          type: "alert-danger"
        });
        e.target.reset();
      });
  };

  return (
    <div
      className={`${styles.container} container-fluid d-flex align-items-center justify-content-center`}
    >
      <div className={styles.loginFormContainer}>
        {message && (
          <div
            className={`alert fade show d-flex ${message.type}`}
            role="alert"
          >
            {message.data}
            <span
              aria-hidden="true"
              className="ml-auto cursor-pointer"
              onClick={() => setMessage(null)}
            >
              &times;
            </span>
          </div>
        )}
        <fieldset className="border p-3 rounded">
          <legend
            className={`${styles.loginFormLegend} border rounded p-1 text-center`}
          >
            Login Form
          </legend>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <div className="form-group">
              <label htmlFor="inputForEmail">Email address</label>
              <span className="mandatory">*</span>
              <input
                id="inputForEmail"
                name="email"
                type="email"
                className="form-control"
                aria-describedby="Enter email address"
                placeholder="Enter email address"
                {...register('email',{
                  required: {
                    value: true,
                    message: "Please enter your email address",
                  },
                })}
              />
              {/**
               * we provide validation configuration for email field above
               * error message are displayed with code below
               */}
              {errors.email && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="inputForPassword">Password</label>
              <span className="mandatory">*</span>
              <input
                type="password"
                name="password"
                className="form-control"
                id="inputForPassword"
                placeholder="Enter password"
                {...register('password',{
                  required: {
                    value: true,
                    message: "Please enter password",
                  },
                })}
              />
              {errors.password && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="d-flex align-items-center">
              <button type="submit" className="btn btn-outline-primary">
                Login
              </button>

              <button className="btn btn-link ml-auto">
                <Link to="/register">New User</Link>
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};


export default Login;
