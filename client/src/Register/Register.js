// Register.js
import React, { useState } from "react";
import styles from "./Register.css";
import config from "../config";
import axios from "axios";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useHistory} from "react-router-dom";

const Register = () =>  {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState();
  const history = useHistory();

  

  const onSubmit = (data, e) => {
    console.log (JSON.stringify(data));
    setMessage({
      data: "Registration is in progress...",
      type: "alert-warning",
    });
    axios.post(`http://localhost:4006/user/register`, {
      data
    })
    .then((data) => {
        const hasError = "error" in data && data.error != null;
        setMessage({
          data: hasError ? data.error : "Registered successfully",
          type: hasError ? "alert-danger" : "alert-success"
        });

        !hasError &&
              setTimeout(() => {
                history.push("/login");
              }, 3000)

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
      <div className={styles.registrationFormContainer}>
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
      </div>

      <fieldset className="border p-3 rounded">
          <legend
            className={`${styles.registrationFormLegend} border rounded p-1 text-center`}
          >
            Registration Form
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
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Enter a valid email address",
                  },
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters are allowed",
                  },
                  maxLength: {
                    value: 255,
                    message: "Maximum 255 characters are allowed",
                  },
                })}
              />
              {/**
               * we provide validation configuration for email field above
               * error message are displayed with code below
               */}
              {errors['email'] && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="inputForName">Your Name</label>
              <span className="mandatory">*</span>
              <input
                id="inputForName"
                name="name"
                type="text"
                className="form-control"
                aria-describedby="Enter your name"
                placeholder="Enter your name"
                {...register('name',{
                  required: {
                    value: true,
                    message: "Please enter your name",
                  },
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters are allowed",
                  },
                  maxLength: {
                    value: 255,
                    message: "Maximum 255 characters are allowed",
                  },
                })}
              />
              {errors.name && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.name.message}
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
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters are allowed",
                  },
                  maxLength: {
                    value: 255,
                    message: "Maximum 255 characters are allowed",
                  },
                })}
              />
              {errors.password && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <button className="btn btn-link">
                <Link to="/login">Cancel</Link>
              </button>
            </div>
          </form>
        </fieldset>

    </div>
  );

};
export default Register;
