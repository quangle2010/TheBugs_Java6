import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Resertpass = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate(); // Khởi tạo useNavigate
    const registerAction = (data) => {
        console.log('Form submitted with data:', data);
        const token = Cookies.get('JWT_TOKEN');
        console.log("Token form cookie", token);

        axios.post("http://localhost:8080/changedpassword", {
            oldpassword: data.oldpassword,
            newpassword: data.newpassword,
            confirmpassword: data.confirmpassword
        }, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}` // Gửi token trong tiêu đề
            }
        })
            .then((response) => {
                console.log('Registration successful:', response);
                if (response.data.status === true) {
                    Cookies.remove('JWT_TOKEN');
                    toast.success("Đổi mật khẩu thành công!", {
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
                }

            })
            .catch((error) => {
                // Check error response and handle properly
                const errorMessage = error.response?.data?.message || "Tài khoản hoặc mật khẩu không đúng";
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

            });

    };

    return (
        <div>
            <section className="form-page">
                <div className="form-container">
                    <form onSubmit={handleSubmit(registerAction)}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h3 className="fw-bold fs-1">Đổi mật khẩu</h3>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="mb-3 row">
                                    <label htmlFor="oldpass" className="col-lg-3 col-sm-4 col-form-label">Mật khẩu cũ</label>
                                    <div className="col-lg-9 col-sm-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("oldpassword", {
                                                required: { value: true, message: "Oldpasword is required" },
                                                minLength: { value: 6, message: "Oldpasword must be at least 6 characters" }
                                            })}
                                        />
                                        {errors.oldpassword && (
                                            <small className="form-text text-muted">{errors.oldpassword.message}</small>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="mb-3 row">
                                    <label htmlFor="newpass" className="col-lg-3 col-sm-4 col-form-label">Mật khẩu mới</label>
                                    <div className="col-lg-9 col-sm-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("newpassword", {
                                                required: { value: true, message: "Newpasword is required" },
                                                minLength: { value: 6, message: "Newpasword must be at least 6 characters" }
                                            })}
                                        />
                                        {errors.newpassword && (
                                            <small className="form-text text-muted">{errors.newpassword.message}</small>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="mb-3 row">
                                    <label htmlFor="cfpass" className="col-lg-3 col-sm-4 col-form-label">Xác nhận mật khẩu mới</label>
                                    <div className="col-lg-9 col-sm-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("confirmpassword", {
                                                required: { value: true, message: "Confirmpasword is required" },
                                                minLength: { value: 6, message: "Confirmpasword must be at least 6 characters" }
                                            })}
                                        />
                                        {errors.confirmpassword && (
                                            <small className="form-text text-muted">{errors.confirmpassword.message}</small>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary w-50">Lưu</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Resertpass;