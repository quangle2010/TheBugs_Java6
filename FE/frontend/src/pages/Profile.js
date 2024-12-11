import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useForm } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "../utils/Toast";
import Cookies from 'js-cookie';
const Profile = () => {
    const namePage = "Thông tin";
    const BASE_URL = "http://localhost:8080/authur/profile";
    const { register, handleSubmit, formState: { errors }, setValue, setError } = useForm();
    const token = Cookies.get('JWT_TOKEN');
    const fetchUserProfile = async () => {
        try {
            if (token) {
                const response = await axios.get(BASE_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data.data;
                setValue("name", userData?.name);
                setValue("email", userData?.email);
                setValue("phone", userData?.phone);
                setValue("address", userData?.address);
            } else {

            }

        } catch (error) {
            console.error('Error:', error);
            showErrorToast("Không thể tải thông tin người dùng.");
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/authur/profile", {
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.status === true) {
                showSuccessToast(response.data.message);
                fetchUserProfile();
            } else {
                console.log(response.data.message);
                if (response.data.message.includes('Số điện thoại đã tồn tại')) {
                    setError("phone", {
                        type: "manual",
                        message: response.data.message
                    });
                }
                // showErrorToast(response.data.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
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
                    <h2 className="fw-bold fs-1">Thông tin</h2>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Họ và tên</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("name", {
                                    required: { value: true, message: "Họ tên không được để trống" }
                                })}
                            />
                            {errors.name && (
                                <small className="text-danger">{errors.name.message}</small>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                {...register("email", {
                                    required: "Email không được để trống"
                                })}
                            />
                            {errors.email && (
                                <small className="text-danger">{errors.email.message}</small>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("phone", {
                                    required: "Số điện thoại không được để trống"
                                })}
                            />
                            {errors.phone && (
                                <small className="text-danger">{errors.phone.message}</small>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Địa chỉ</label>
                            <textarea
                                className="form-control"
                                id="address"
                                rows="2"
                                {...register("address", {
                                    required: "Địa chỉ không được bỏ trống"
                                })}
                            ></textarea>
                            {errors.address && (
                                <small className="text-danger">{errors.address.message}</small>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary w-100 my-3">
                            Lưu
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Profile;
