import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const registerAction = (data) => {
        console.log('Form submitted with data:', data);

        axios.post("http://localhost:8080/register", {
            username: data.username,
            password: data.password,
            name: data.name,
            confirmpassword: data.confirmpassword
        })
            .then((response) => {
                console.log('Registration successful:', response);
                // You can redirect or show a success message here
                toast.success("Đăng ký thành công!", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => {
                    navigate('/login');
                }, 1000);

            })
            .catch((error) => {
                console.error('Registration failed:', error);
            });
    };

    return (
        <>
            <section className='form-page'>
                <div className='form-container'>
                    <h2 className="fw-bold fs-1">Đăng ký</h2>
                    <form onSubmit={handleSubmit(registerAction)}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("username", {
                                    required: { value: true, message: "Username is required" },
                                    minLength: { value: 5, message: "Username must be at least 5 characters" }
                                })}
                            />
                            {errors.username && (
                                <small className="form-text text-muted">{errors.username.message}</small>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                                })}
                            />
                            {errors.password && (
                                <small className="form-text text-muted">{errors.password.message}</small>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: { value: 3, message: "Name must be at least 3 characters" }
                                })}
                            />
                            {errors.name && (
                                <small className="form-text text-muted">{errors.name.message}</small>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">ConfirmPassword</label>
                            <input
                                type="password"
                                className="form-control"
                                {...register("confirmpassword", {
                                    required: "ConfirmPassword is required",
                                    minLength: { value: 6, message: "ConfirmPassword must be at least 6 characters" }
                                })}
                            />
                            {errors.confirmpassword && (
                                <small className="form-text text-muted">{errors.confirmpassword.message}</small>
                            )}
                        </div>


                        <button type="submit" className="btn btn-primary" >Sign Up</button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Signup;
