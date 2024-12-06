import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import { showErrorToast, showSuccessToast } from '../utils/Toast';
import axios from 'axios';
const Login = () => {
    const namePage = "Đăng nhập";
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/login", {
                username: data.username,
                password: data.password
            });

            if (response.data.status === true) {
                Cookies.set('JWT_TOKEN', response.data.data, { expires: 7, secure: true });

                showSuccessToast(response.data.message);
                navigate('/home', { replace: true });
            } else {
                showErrorToast(response.data.message || "Đăng nhập thất bại");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Tài khoản hoặc mật khẩu không đúng";
            showErrorToast(errorMessage);
        }
    };

    return (
        <>
            <Helmet>
                <title>{namePage}</title>
            </Helmet>
            <section className="form-page">
                <div className="form-container">
                    <h2 className="fw-bold fs-1">Đăng nhập</h2>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("username", {
                                    required: { value: true, message: "Username không được để trống" },
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
                                    required: "Mật khẩu không được để trống",
                                    minLength: { value: 5, message: "Mật khẩu ít nhất 5 ký tự" }
                                })}
                            />
                            {errors.password && (
                                <small className="form-text text-muted">{errors.password.message}</small>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100 my-3">
                            Đăng nhập
                        </button>
                        <div className="register-link d-flex justify-content-between align-items-center">
                            <Link to="/register">Đăng ký</Link>
                            <a href="/forgot-pass">Quên mật khẩu</a>
                        </div>
                    </form>
                </div>
            </section>

        </>
    );
};

export default Login;
